import logging
from typing import List, Optional

from motor.motor_asyncio import AsyncIOMotorCollection

from app.config import settings
from app.schemas.product import ProductOut
from app.services.llm.chains import make_correction_chain
from app.services.llm.loader import load_medication_names
from app.services.llm.tools import make_search_tool

logger = logging.getLogger(__name__)


def _build_llm():
    provider = settings.LLM_PROVIDER
    model = settings.LLM_MODEL
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
        self._correction_chain = make_correction_chain(self._llm)
        self._medication_names: Optional[List[str]] = None
        logger.info("LLMService ready — provider=%s model=%s", settings.LLM_PROVIDER, settings.LLM_MODEL)

    async def _get_medication_names(self) -> List[str]:
        if self._medication_names is None:
            self._medication_names = await load_medication_names()
        return self._medication_names

    async def respond(self, message: str, collection: AsyncIOMotorCollection) -> List[ProductOut]:
        logger.info("[CHAT] User message: %r", message)

        # Step 1 — load medication names from DB and correct the user input
        medication_names = await self._get_medication_names()
        corrected_name = await self._correction_chain.ainvoke({
            "user_input": message,
            "medication_names": "\n".join(medication_names),
        })
        logger.info("[CHAT] LLM corrected name: %r → %r", message, corrected_name)

        # Step 2 — search the database with the corrected name
        search_tool = make_search_tool(collection)
        raw_results = await search_tool.ainvoke({"query": corrected_name})
        logger.info("[CHAT] DB returned %d result(s) for %r", len(raw_results), corrected_name)

        # Step 3 — return product objects to the endpoint
        results = [ProductOut(**item) for item in raw_results]
        logger.info("[CHAT] Returning %d product(s) to endpoint", len(results))
        return results


_llm_service: Optional[LLMService] = None


def get_llm_service() -> LLMService:
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service