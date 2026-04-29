from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.dependencies import get_current_user, get_users_collection
from app.schemas.auth import LoginRequest, TokenResponse, UserOut
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _get_auth_service(
    users: AsyncIOMotorCollection = Depends(get_users_collection),
) -> AuthService:
    return AuthService(users)


@router.post("/login", response_model=TokenResponse, summary="Obtain access token")
async def login(
    body: LoginRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenResponse:
    return await service.login(email=body.email, password=body.password)


@router.get("/me", response_model=UserOut, summary="Get current user")
async def get_me(current_user: dict = Depends(get_current_user)) -> UserOut:
    return UserOut(
        id=str(current_user["_id"]),
        email=current_user["email"],
        full_name=current_user.get("full_name"),
        is_active=current_user["is_active"],
        is_admin=current_user.get("is_admin", False),
        created_at=current_user["created_at"],
    )
