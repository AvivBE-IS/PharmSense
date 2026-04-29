"""
Authentication service — pure business logic, no HTTP, no SQLAlchemy.

This class receives an AbstractUserRepository, so it works with any
database backend and is straightforward to unit-test with a mock repo.
"""

from typing import Optional

from fastapi import HTTPException, status

from app.core.security import create_access_token, verify_password
from app.models.user import User
from app.repositories.base import AbstractUserRepository
from app.schemas.auth import TokenResponse


class AuthService:
    def __init__(self, repo: AbstractUserRepository) -> None:
        self._repo = repo

    def login(self, email: str, password: str) -> TokenResponse:
        """
        Validate credentials and return a JWT access token.

        Raises:
            HTTPException(401): If the email does not exist or the password is wrong.
            HTTPException(403): If the account is deactivated.
        """
        user = self._repo.get_by_email(email)
        if user is None or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated",
            )
        token = create_access_token(subject=user.id)
        return TokenResponse(access_token=token)

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Retrieve a user by id, or None."""
        return self._repo.get_by_id(user_id)
