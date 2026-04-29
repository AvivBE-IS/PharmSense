import re
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import List, Tuple

logger = logging.getLogger(__name__)

# Resolves to: <repo_root>/backend/data_context/
DATA_CONTEXT_DIR = Path(__file__).resolve().parent.parent.parent.parent / "data_context"


@dataclass
class RetrievedChunk:
    source: str
    text: str
    score: float


class ContextLoader:
    CHUNK_SIZE = 400
    OVERLAP = 60

    def __init__(self, context_dir: Path = DATA_CONTEXT_DIR) -> None:
        self.context_dir = context_dir
        self._chunks: List[Tuple[str, str]] = []
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
        logger.info("ContextLoader ready — %d total chunks", loaded_total)

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


class TextSearchRetriever:
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
    """Placeholder for semantic vector search. Swap in for TextSearchRetriever when ready."""

    def __init__(self, loader: ContextLoader) -> None:
        self._loader = loader

    def retrieve(self, query: str, top_k: int = 3) -> List[RetrievedChunk]:
        raise NotImplementedError("VectorRetriever not yet implemented — use TextSearchRetriever")
