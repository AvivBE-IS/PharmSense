from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService, get_chat_service

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse, summary="Send a message to the AI assistant")
async def chat(
    request: ChatRequest,
    service: ChatService = Depends(get_chat_service),
    _current_user: dict = Depends(get_current_user),
) -> ChatResponse:
    result = service.respond(request.message)
    return ChatResponse(**result)
