"""
Chat service — orchestrates context loading, retrieval, and response generation.

Developer ownership (designed for parallel work):
  ┌─────────────────────────────────────────────────────────────────┐
  │  Dev 1 (UI)            → frontend/src/pages/ChatPage.jsx        │
  │  Dev 2 (Data Pipeline) → ContextLoader, TextSearchRetriever     │
  │  Dev 3 (API Logic)     → ChatService, chat endpoint             │
  │  Dev 4 (AI / RAG)      → VectorRetriever (swap-in when ready)   │
  └─────────────────────────────────────────────────────────────────┘

Swap the retriever in ChatService.__init__() — no other file needs to change.
"""

import re
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional, Tuple

logger = logging.getLogger(__name__)

# Resolves to: <repo_root>/backend/data_context/
DATA_CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent / "data_context"


# ── Data Models ───────────────────────────────────────────────────────────────

@dataclass
class RetrievedChunk:
    source: str        # file stem, e.g. "pharma_context"
    text: str          # raw chunk text
    score: float       # relevance score 0–1


# ── Data Processing Layer (Dev 2) ─────────────────────────────────────────────

class ContextLoader:
    """
    Loads .txt files from data_context/ into memory as overlapping text chunks.

    To extend: override _load() or add parsers for PDF / database sources.
    All consumers depend only on the `.chunks` property — safe to swap internals.
    """

    CHUNK_SIZE = 400   # characters per chunk
    OVERLAP    = 60    # character overlap between consecutive chunks

    def __init__(self, context_dir: Path = DATA_CONTEXT_DIR) -> None:
        self.context_dir = context_dir
        self._chunks: List[Tuple[str, str]] = []   # (source_name, chunk_text)
        self._load()

    def _load(self) -> None:
        if not self.context_dir.exists():
            logger.warning("data_context directory not found at: %s", self.context_dir)
            return

        loaded_total = 0
        for txt_file in sorted(self.context_dir.glob("*.txt")):
            text = txt_file.read_text(encoding="utf-8")
            chunks = self._split(text)
            for chunk in chunks:
                self._chunks.append((txt_file.stem, chunk))
            loaded_total += len(chunks)
            logger.info("Loaded %d chunks from '%s'", len(chunks), txt_file.name)

        logger.info("ContextLoader ready — %d total chunks across all files", loaded_total)

    def _split(self, text: str) -> List[str]:
        chunks: List[str] = []
        start = 0
        while start < len(text):
            end = min(start + self.CHUNK_SIZE, len(text))
            chunk = text[start:end].strip()
            if chunk:
                chunks.append(chunk)
            start += self.CHUNK_SIZE - self.OVERLAP
        return chunks

    @property
    def chunks(self) -> List[Tuple[str, str]]:
        return self._chunks


# ── RAG / Retrieval Layer (Dev 4) ─────────────────────────────────────────────

class TextSearchRetriever:
    """
    Simple keyword-based in-memory retriever.
    Scores chunks by counting query-token overlaps.

    This is the active retriever for the initial release.
    Replace with VectorRetriever once embeddings are available.
    """

    def __init__(self, loader: ContextLoader) -> None:
        self._loader = loader

    def retrieve(self, query: str, top_k: int = 3) -> List[RetrievedChunk]:
        query_tokens = set(re.findall(r"\w+", query.lower()))
        if not query_tokens:
            return []

        scored: List[RetrievedChunk] = []
        for source, text in self._loader.chunks:
            chunk_tokens = set(re.findall(r"\w+", text.lower()))
            overlap = len(query_tokens & chunk_tokens)
            if overlap > 0:
                score = round(overlap / max(len(query_tokens), 1), 3)
                scored.append(RetrievedChunk(source=source, text=text, score=score))

        scored.sort(key=lambda c: c.score, reverse=True)
        return scored[:top_k]


class VectorRetriever:
    """
    Placeholder for semantic vector search (ChromaDB / FAISS).

    ── How to activate (Dev 4 — AI/RAG team) ──────────────────────────────────
    1. Install:    pip install chromadb sentence-transformers
    2. Implement:  _embed(text) → call SentenceTransformer model
    3. Implement:  retrieve()   → vector similarity search against the index
    4. Wire in:    in ChatService.__init__, replace TextSearchRetriever(loader)
                   with VectorRetriever(loader)
    ────────────────────────────────────────────────────────────────────────────
    """

    def __init__(self, loader: ContextLoader) -> None:
        # TODO: self._client = chromadb.Client()
        # TODO: self._collection = self._client.create_collection("pharmsense")
        # TODO: index all chunks on startup
        self._loader = loader
        logger.info("VectorRetriever initialized (stub — falling back not supported, use TextSearchRetriever)")

    def _embed(self, text: str) -> List[float]:
        # TODO: from sentence_transformers import SentenceTransformer
        # TODO: return SentenceTransformer("all-MiniLM-L6-v2").encode(text).tolist()
        raise NotImplementedError("Embedding model not configured — install sentence-transformers")

    def retrieve(self, query: str, top_k: int = 3) -> List[RetrievedChunk]:
        # TODO: results = self._collection.query(query_embeddings=[self._embed(query)], n_results=top_k)
        # TODO: map results to List[RetrievedChunk]
        raise NotImplementedError("VectorRetriever not yet implemented — use TextSearchRetriever")


# ── Chat Service (Dev 3) ──────────────────────────────────────────────────────

class ChatService:
    """
    Orchestrates context retrieval and reply generation.

    To connect an LLM: replace _generate_reply() with an API call.
    The retriever and context loader are injected — safe to swap independently.
    """

    DATA_SOURCE_LABEL = "Local Context"

    def __init__(self) -> None:
        loader = ContextLoader()
        # ── Swap retriever here — no other code needs to change ──
        self._retriever = TextSearchRetriever(loader)
        # self._retriever = VectorRetriever(loader)   # enable when ready

    # ── Internal helpers ──────────────────────────────────────────────────────

    def _build_system_prompt(self, retrieved: List[RetrievedChunk]) -> str:
        """Builds system prompt with injected context snippets."""
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

    def _generate_reply(
        self,
        message: str,
        system_prompt: str,
        retrieved: List[RetrievedChunk],
    ) -> str:
        """
        Mock reply generator — returns the top retrieved context chunk.

        ── To connect an LLM (Dev 3 — API Logic team) ─────────────────────────
        Replace the body of this method with:

            import openai
            response = openai.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user",   "content": message},
                ],
            )
            return response.choices[0].message.content
        ────────────────────────────────────────────────────────────────────────
        """
        if not retrieved:
            return (
                f'No relevant information found in the local knowledge base for: "{message}". '
                "Try rephrasing your query, or connect an LLM for broader coverage."
            )

        top = retrieved[0]
        source_list = ", ".join(f"{r.source} ({r.score:.0%})" for r in retrieved)
        return (
            f"Based on the local knowledge base, here is what I found:\n\n"
            f"{top.text}\n\n"
            f"— Sources consulted: {source_list}\n"
            f"— Connect an LLM to generate a natural-language answer from this context."
        )

    # ── Public API ────────────────────────────────────────────────────────────

    def respond(self, message: str) -> dict:
        """
        Main entry point called by the /chat endpoint.

        Returns a dict matching ChatResponse schema:
          { reply, sources, data_source }
        """
        retrieved = self._retriever.retrieve(message)
        system_prompt = self._build_system_prompt(retrieved)
        reply = self._generate_reply(message, system_prompt, retrieved)

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


# ── Module-level singleton (lazy-initialized via FastAPI DI) ──────────────────

_chat_service: Optional[ChatService] = None


def get_chat_service() -> ChatService:
    """FastAPI dependency — returns the shared ChatService singleton."""
    global _chat_service
    if _chat_service is None:
        _chat_service = ChatService()
    return _chat_service
