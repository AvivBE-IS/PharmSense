import logging
from typing import List, Optional

from motor.motor_asyncio import AsyncIOMotorCollection

from app.config import settings
from app.schemas.product import ProductOut
from app.services.llm.chains import make_correction_chain
from app.services.llm.loader import load_medication_names, load_tags
from app.services.llm.tools import make_search_tool

logger = logging.getLogger(__name__)


def _build_llm(provider: str | None = None, model: str | None = None):
    """Build a LangChain chat model. Defaults to primary provider; pass overrides for fallback."""
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
        self._correction_chain = make_correction_chain(self._llm)

        # Fallback chain — only built if FALLBACK_LLM_PROVIDER is configured and its key is present
        self._fallback_correction_chain = None
        fallback_provider = settings.FALLBACK_LLM_PROVIDER or None
        fallback_model = settings.FALLBACK_LLM_MODEL or None

        # Check that the required API key for the fallback provider is actually set
        _fallback_key_present = False
        if fallback_provider == "openai" and settings.OPENAI_API_KEY:
            _fallback_key_present = True
        elif fallback_provider == "anthropic" and settings.ANTHROPIC_API_KEY:
            _fallback_key_present = True
        elif fallback_provider == "gemini" and settings.GEMINI_API_KEY:
            _fallback_key_present = True

        if fallback_provider and _fallback_key_present:
            try:
                fallback_llm = _build_llm(provider=fallback_provider, model=fallback_model)
                self._fallback_correction_chain = make_correction_chain(fallback_llm)
                logger.info(
                    "LLMService ready — primary=%s/%s | fallback=%s/%s",
                    settings.LLM_PROVIDER, settings.LLM_MODEL,
                    fallback_provider, fallback_model or "(provider default)",
                )
            except Exception as e:
                logger.warning("Failed to build fallback LLM (%s): %s", fallback_provider, e)
        else:
            if fallback_provider and not _fallback_key_present:
                logger.warning(
                    "FALLBACK_LLM_PROVIDER=%r set but API key is missing — fallback disabled.",
                    fallback_provider,
                )
            logger.info(
                "LLMService ready — primary=%s/%s | no fallback configured",
                settings.LLM_PROVIDER, settings.LLM_MODEL,
            )

        self._medication_names: Optional[List[str]] = None
        self._tags: Optional[List[str]] = None

    async def _get_medication_names(self) -> List[str]:
        if self._medication_names is None:
            self._medication_names = await load_medication_names()
        return self._medication_names

    async def _get_tags(self) -> List[str]:
        if self._tags is None:
            self._tags = await load_tags()
        return self._tags

    async def respond(self, message: str, collection: AsyncIOMotorCollection) -> "ChatResponse":
        from app.schemas.chat import ChatResponse

        logger.info("[CHAT] User message: %r", message)

        # Step 1 — load medication names + tags, run the structured LLM chain
        medication_names = await self._get_medication_names()
        tags = await self._get_tags()
        invoke_payload = {
            "user_input": message,
            "medication_names": "\n".join(medication_names),
            "tags_list": ", ".join(tags),
        }

        parsed: dict = {}
        try:
            parsed = await self._correction_chain.ainvoke(invoke_payload)
            logger.info("[CHAT] LLM parsed response: %r", parsed)
        except Exception as exc:
            logger.warning(
                "[CHAT] Primary LLM (%s/%s) failed. Error: %s: %s",
                settings.LLM_PROVIDER,
                settings.LLM_MODEL,
                type(exc).__name__,
                exc,
            )
            if self._fallback_correction_chain is None:
                logger.error("[CHAT] No fallback LLM configured — returning empty results.")
                return ChatResponse(results=[], corrected_name=message)
            try:
                parsed = await self._fallback_correction_chain.ainvoke(invoke_payload)
                logger.info(
                    "[CHAT] Fallback LLM (%s/%s) parsed response: %r",
                    settings.FALLBACK_LLM_PROVIDER, settings.FALLBACK_LLM_MODEL, parsed,
                )
            except Exception as fallback_exc:
                logger.error(
                    "[CHAT] Fallback LLM (%s/%s) also failed: %s: %s",
                    settings.FALLBACK_LLM_PROVIDER, settings.FALLBACK_LLM_MODEL,
                    type(fallback_exc).__name__, fallback_exc,
                )
                return ChatResponse(results=[], corrected_name=message)

        corrected_name: str | None = parsed.get("corrected_name") or None
        symptom_tags: List[str] = parsed.get("symptom_tags") or []
        target_audience: str = parsed.get("target_audience") or ""

        # If the LLM found no match at all, return early with no results
        if parsed.get("no_data"):
            logger.info("[CHAT] LLM reported no data match for %r", message)
            return ChatResponse(results=[], corrected_name=None)

        # Step 2 — search the database using name + tags + audience
        search_tool = make_search_tool(collection)
        raw_results = await search_tool.ainvoke({
            "query": corrected_name or "",
            "symptom_tags": symptom_tags,
            "target_audience": target_audience,
        })
        logger.info(
            "[CHAT] DB returned %d result(s) — name=%r tags=%r audience=%r",
            len(raw_results), corrected_name, symptom_tags, target_audience,
        )

        # Step 3 — build and return structured ChatResponse
        results = [ProductOut(**item) for item in raw_results]
        logger.info("[CHAT] Returning %d product(s) to endpoint", len(results))
        return ChatResponse(
            results=results,
            corrected_name=corrected_name,
        )


_llm_service: Optional[LLMService] = None


def get_llm_service() -> LLMService:
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service
