"""
API v1 root router — includes all endpoint sub-routers.
Add new feature routers here as the application grows.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, chat

router = APIRouter()

router.include_router(auth.router)
router.include_router(chat.router)
# router.include_router(patients.router)   # Example: future feature
# router.include_router(medications.router)
