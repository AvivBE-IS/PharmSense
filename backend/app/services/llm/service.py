import logging
from typing import Optional, TypedDict

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langgraph.graph import END, StateGraph

from app.config import settings
from app.services.chat.retriever import ContextLoader, TextSearchRetriever

logger = logging.getLogger(__name__)


class LLMState(TypedDict):
    user_message: str
    context: str
    answer: str


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

    raise ValueError(f"Unsupported LLM_PROVIDER: {provider!r}. Choose 'openai' or 'anthropic'.")


class LLMService:
    SYSTEM_PROMPT_TEMPLATE = (
        "You are PharmSense, a pharmaceutical assistant. "
        "Answer the user's question using ONLY the context below. "
        "If the answer is not in the context, say so clearly.\n\n"
        "--- CONTEXT ---\n{context}\n--- END CONTEXT ---"
    )

    def __init__(self) -> None:
        loader = ContextLoader()
        self._retriever = TextSearchRetriever(loader)
        self._llm = _build_llm()
        self._graph = self._build_graph()
        logger.info("LLMService ready — provider=%s model=%s", settings.LLM_PROVIDER, settings.LLM_MODEL)

    def _retrieve(self, state: LLMState) -> dict:
        chunks = self._retriever.retrieve(state["user_message"], top_k=4)
        context = "\n\n".join(f"[{c.source} | {c.score:.0%}]\n{c.text}" for c in chunks)
        return {"context": context or "No relevant context found."}

    def _generate(self, state: LLMState) -> dict:
        system_prompt = self.SYSTEM_PROMPT_TEMPLATE.format(context=state["context"])
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=state["user_message"]),
        ]
        response: AIMessage = self._llm.invoke(messages)
        return {"answer": response.content}

    def _build_graph(self):
        graph = StateGraph(LLMState)
        graph.add_node("retrieve", self._retrieve)
        graph.add_node("generate", self._generate)
        graph.set_entry_point("retrieve")
        graph.add_edge("retrieve", "generate")
        graph.add_edge("generate", END)
        return graph.compile()

    def respond(self, message: str) -> dict:
        final_state: LLMState = self._graph.invoke({"user_message": message})
        return {
            "reply": final_state["answer"],
            "sources": [],
            "data_source": f"{settings.LLM_PROVIDER}/{settings.LLM_MODEL}",
        }


_llm_service: Optional[LLMService] = None


def get_llm_service() -> LLMService:
    global _llm_service
    if _llm_service is None:
        _llm_service = LLMService()
    return _llm_service
