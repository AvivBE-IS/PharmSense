from datetime import datetime, timezone

from bson import ObjectId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.schemas.auth import RegisterRequest, TokenPairResponse, TokenResponse


class AuthService:
    def __init__(self, users: AsyncIOMotorCollection) -> None:
        self._users = users

    async def login(self, email: str, password: str) -> TokenPairResponse:
        user = await self._users.find_one({"email": email.lower()})
        if user is None or not verify_password(password, user["password_hash"]):
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
        now = datetime.now(timezone.utc)
        await self._users.update_one(
            {"_id": user["_id"]},
            {"$set": {"last_login_at": now, "updated_at": now}},
        )
        return self._issue_token_pair(str(user["_id"]))

    async def register(self, body: RegisterRequest) -> TokenPairResponse:
        existing = await self._users.find_one({"email": body.email.lower()})
        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered",
            )
        now = datetime.now(timezone.utc)
        doc = {
            "name": body.name,
            "email": body.email.lower(),
            "password_hash": hash_password(body.password),
            "age": body.age,
            "gender": body.gender,
            "city": body.city,
            "language": body.language,
            "is_active": True,
            "created_at": now,
            "updated_at": now,
            "last_login_at": None,
        }
        result = await self._users.insert_one(doc)
        return self._issue_token_pair(str(result.inserted_id))

    async def refresh_token(self, token: str) -> TokenResponse:
        user_id_str = decode_token(token, expected_type="refresh")
        if user_id_str is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        try:
            oid = ObjectId(user_id_str)
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token subject",
            )
        user = await self._users.find_one({"_id": oid})
        if user is None or not user.get("is_active", False):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or deactivated",
            )
        return TokenResponse(access_token=create_access_token(user_id_str))

    @staticmethod
    def _issue_token_pair(user_id: str) -> TokenPairResponse:
        return TokenPairResponse(
            access_token=create_access_token(user_id),
            refresh_token=create_refresh_token(user_id),
        )
