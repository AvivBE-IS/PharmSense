from fastapi import APIRouter

from app.api import auth, chat, products

router = APIRouter()

router.include_router(auth.router)
router.include_router(chat.router)
router.include_router(products.router)
