"""
Chat endpoint — POST /api/v1/chat

Developer note (Dev 3 — API Logic team):
  Add request validation, rate limiting, or conversation history here
  without touching the service layer.
"""

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService, get_chat_service

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse, summary="Send a message to the AI assistant")
def chat(
    request: ChatRequest,
    service: ChatService = Depends(get_chat_service),
    current_user: User = Depends(get_current_user),
) -> ChatResponse:
    """
    Accepts a user message, retrieves relevant context from the local knowledge
    base, and returns an assistant reply with source citations.

    Requires a valid Bearer token (authenticated users only).
    """
    result = service.respond(request.message)
    return ChatResponse(**result)
