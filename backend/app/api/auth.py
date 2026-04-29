from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.dependencies import get_current_user, get_users_collection
from app.schemas.auth import (
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenPairResponse,
    TokenResponse,
)
from app.schemas.user import UserOut
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _get_auth_service(
    users: AsyncIOMotorCollection = Depends(get_users_collection),
) -> AuthService:
    return AuthService(users)


@router.post("/register", response_model=TokenPairResponse, status_code=201, summary="Create account")
async def register(
    body: RegisterRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenPairResponse:
    return await service.register(body)


@router.post("/login", response_model=TokenPairResponse, summary="Obtain token pair")
async def login(
    body: LoginRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenPairResponse:
    return await service.login(email=body.email, password=body.password)


@router.post("/refresh", response_model=TokenResponse, summary="Refresh access token")
async def refresh(
    body: RefreshRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenResponse:
    return await service.refresh_token(body.refresh_token)


@router.get("/me", response_model=UserOut, summary="Get current user")
async def get_me(current_user: dict = Depends(get_current_user)) -> UserOut:
    return UserOut.from_document(current_user)
