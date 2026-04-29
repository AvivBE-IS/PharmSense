from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.security import create_access_token, verify_password
from app.schemas.auth import TokenResponse


class AuthService:
    def __init__(self, users: AsyncIOMotorCollection) -> None:
        self._users = users

    async def login(self, email: str, password: str) -> TokenResponse:
        user = await self._users.find_one({"email": email.lower()})
        if user is None or not verify_password(password, user["hashed_password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not user.get("is_active", True):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated",
            )
        token = create_access_token(subject=str(user["_id"]))
        return TokenResponse(access_token=token)
