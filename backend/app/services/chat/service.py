import logging
from typing import List, Optional

from app.services.chat.retriever import ContextLoader, RetrievedChunk, TextSearchRetriever

logger = logging.getLogger(__name__)


class ChatService:
    DATA_SOURCE_LABEL = "Local Context"

    def __init__(self) -> None:
        loader = ContextLoader()
        self._retriever = TextSearchRetriever(loader)

    def _build_system_prompt(self, retrieved: List[RetrievedChunk]) -> str:
        if not retrieved:
            return (
                "You are a helpful pharmaceutical assistant. "
                "Answer based on general pharmaceutical knowledge."
            )
        context_block = "\n\n".join(
            f"[Source: {r.source} | relevance: {r.score}]\n{r.text}"
            for r in retrieved
        )
        return (
            "You are a helpful pharmaceutical assistant.\n"
            "Use ONLY the following retrieved context to answer the user's question.\n"
            "If the answer cannot be found in the context, say so clearly.\n\n"
            f"--- CONTEXT START ---\n{context_block}\n--- CONTEXT END ---"
        )

    def _generate_reply(self, message: str, retrieved: List[RetrievedChunk]) -> str:
        if not retrieved:
            return (
                f'No relevant information found for: "{message}". '
                "Try rephrasing your query, or connect an LLM for broader coverage."
            )
        top = retrieved[0]
        source_list = ", ".join(f"{r.source} ({r.score:.0%})" for r in retrieved)
        return (
            f"Based on the local knowledge base, here is what I found:\n\n"
            f"{top.text}\n\n"
            f"— Sources consulted: {source_list}"
        )

    def respond(self, message: str) -> dict:
        retrieved = self._retriever.retrieve(message)
        reply = self._generate_reply(message, retrieved)
        return {
            "reply": reply,
            "sources": [
                {
                    "source": r.source,
                    "snippet": r.text[:140].rstrip() + ("…" if len(r.text) > 140 else ""),
                    "relevance_score": r.score,
                }
                for r in retrieved
            ],
            "data_source": self.DATA_SOURCE_LABEL,
        }


_chat_service: Optional[ChatService] = None


def get_chat_service() -> ChatService:
    global _chat_service
    if _chat_service is None:
        _chat_service = ChatService()
    return _chat_service
