"""
FastAPI dependency injection providers.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorCollection, AsyncIOMotorDatabase
from bson import ObjectId

from app.core.security import decode_token
from app.db.mongodb import get_database

_bearer_scheme = HTTPBearer()


def get_db() -> AsyncIOMotorDatabase:
    return get_database()


from app.config import settings

def get_users_collection(db: AsyncIOMotorDatabase = Depends(get_db)) -> AsyncIOMotorCollection:
    return db[settings.MONGODB_USERS_COLLECTION]


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
    users: AsyncIOMotorCollection = Depends(get_users_collection),
) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user_id_str = decode_token(credentials.credentials)
    if user_id_str is None:
        raise credentials_exception

    try:
        oid = ObjectId(user_id_str)
    except Exception:
        raise credentials_exception

    user = await users.find_one({"_id": oid})
    if user is None or not user.get("is_active", False):
        raise credentials_exception

    return user
