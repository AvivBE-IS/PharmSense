import logging

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.dependencies import get_current_user, get_products_collection
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm import LLMService, get_llm_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    service: LLMService = Depends(get_llm_service),
    products: AsyncIOMotorCollection = Depends(get_products_collection),
    _current_user: dict = Depends(get_current_user),
) -> ChatResponse:
    logger.info("[REQUEST] POST /chat — message: %r", request.message)
    results = await service.respond(request.message, products)
    logger.info("[RESPONSE] POST /chat — %d product(s) returned", len(results))
    return ChatResponse(results=results)