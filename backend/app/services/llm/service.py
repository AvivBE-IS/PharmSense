import json
import logging
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorCollection

from app.config import settings
from app.schemas.product import ProductOut
from app.services.llm.chains import make_query_builder_chain, make_schema_resolver_chain
from app.services.llm.loader import load_product_schema
from app.services.llm.tools import make_search_tool

logger = logging.getLogger(__name__)


def _build_llm(provider: str | None = None, model: str | None = None):
    provider = provider or settings.LLM_PROVIDER
    model = model or settings.LLM_MODEL
    temperature = settings.LLM_TEMPERATURE

    if provider == "openai":
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(model=model, temperature=temperature, api_key=settings.OPENAI_API_KEY or None)

    if provider == "anthropic":
        from langchain_anthropic import ChatAnthropic
        return ChatAnthropic(model=model, temperature=temperature, api_key=settings.ANTHROPIC_API_KEY or None)

    if provider == "gemini":
        from langchain_google_genai import ChatGoogleGenerativeAI
        return ChatGoogleGenerativeAI(model=model, temperature=temperature, google_api_key=settings.GEMINI_API_KEY or None)

    raise ValueError(f"Unsupported LLM_PROVIDER: {provider!r}. Choose 'openai', 'anthropic', or 'gemini'.")


class LLMService:
    def __init__(self) -> None:
        self._llm = _build_llm()
        self._schema_resolver_chain = make_schema_resolver_chain(self._llm)
        self._query_builder_chain = make_query_builder_chain(self._llm)
        self._product_schema: Optional[str] = None
        logger.info("LLMService ready — provider=%s model=%s", settings.LLM_PROVIDER, settings.LLM_MODEL)

    async def _get_product_schema(self) -> str:
        if self._product_schema is None:
            self._product_schema = await load_product_schema()
        return self._product_schema

    async def respond(self, message: str, collection: AsyncIOMotorCollection) -> "ChatResponse":
        from app.schemas.chat import ChatResponse

        logger.info("[CHAT] User message: %r", message)

        # Step 1 — fetch real DB schema (cached after first call)
        product_schema = await self._get_product_schema()
        logger.info("[CHAT] Using product schema:\n%s", product_schema)

        # Step 2 — Chain 1: resolve domain + relevant fields
        resolved = await self._schema_resolver_chain.ainvoke({
            "user_input": message,
            "product_schema": product_schema,
        })
        logger.info("[CHAT] Schema resolver result: %s", json.dumps(resolved, indent=2, default=str))

        if not resolved.get("in_domain"):
            out_msg = resolved.get("out_of_domain_message") or "We only provide information about pharmaceutical products."
            logger.info("[CHAT] Out-of-domain query — returning message: %r", out_msg)
            return ChatResponse(results=[], message=out_msg)

        relevant_fields = resolved.get("relevant_fields", [])
        logger.info("[CHAT] Relevant fields selected: %s", relevant_fields)

        # Step 3 — Chain 2: build MongoDB filter from relevant fields + user input
        mongo_filter = await self._query_builder_chain.ainvoke({
            "user_input": message,
            "relevant_fields": "\n".join(f"- {f}" for f in relevant_fields),
        })
        logger.info("[CHAT] MongoDB filter:\n%s", json.dumps(mongo_filter, indent=2, default=str))

        # Step 4 — search the database
        search_tool = make_search_tool(collection)
        raw_results = await search_tool.ainvoke({"filter": mongo_filter})

        results = [ProductOut(**item) for item in raw_results]
        logger.info("[CHAT] Returning %d product(s) to endpoint", len(results))
        return ChatResponse(results=results)


_llm_service: Optional[LLMService] = None


def get_llm_service() -> LLMService:
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service
