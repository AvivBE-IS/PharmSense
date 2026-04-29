"""
Auth endpoints — /api/v1/auth/
"""

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user, get_user_repository
from app.models.user import User
from app.repositories.user_repository import SQLAlchemyUserRepository
from app.schemas.auth import LoginRequest, TokenResponse, UserOut
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _get_auth_service(
    repo: SQLAlchemyUserRepository = Depends(get_user_repository),
) -> AuthService:
    """Build AuthService with the current-request repository (injected by FastAPI)."""
    return AuthService(repo)


@router.post("/login", response_model=TokenResponse, summary="Obtain access token")
def login(
    body: LoginRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenResponse:
    """
    Authenticate with email + password and receive a JWT Bearer token.

    Use the returned `access_token` in the `Authorization: Bearer <token>` header
    for all protected endpoints.
    """
    return service.login(email=body.email, password=body.password)


@router.get("/me", response_model=UserOut, summary="Get current user")
def get_me(current_user: User = Depends(get_current_user)) -> User:
    """Return the profile of the currently authenticated user."""
    return current_user
