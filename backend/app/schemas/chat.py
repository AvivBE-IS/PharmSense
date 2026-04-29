"""
Pydantic schemas for the Chat API.

Developer note: Keep schemas in this file only. Business logic belongs in chat_service.py.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="User message text")


class SourceInfo(BaseModel):
    source: str = Field(..., description="Name of the source document")
    snippet: str = Field(..., description="Relevant text excerpt")
    relevance_score: float = Field(..., ge=0.0, le=1.0, description="Match confidence (0–1)")


class ChatResponse(BaseModel):
    reply: str = Field(..., description="Assistant reply text")
    sources: List[SourceInfo] = Field(default_factory=list, description="Retrieved context sources")
    data_source: str = Field(..., description="Active data source label shown in the UI")
