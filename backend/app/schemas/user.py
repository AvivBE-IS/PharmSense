"""
User-facing API schemas.

Rule: nothing here references password_hash or any internal DB field.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserOut(BaseModel):
    """Returned by any endpoint that exposes user data."""
    id: str
    name: str
    email: EmailStr
    age: int
    gender: str
    city: str
    language: str
    is_active: bool
    created_at: datetime
    last_login_at: Optional[datetime] = None

    @classmethod
    def from_document(cls, doc: dict) -> "UserOut":
        return cls(
            id=str(doc["_id"]),
            name=doc["name"],
            email=doc["email"],
            age=doc["age"],
            gender=doc["gender"],
            city=doc["city"],
            language=doc["language"],
            is_active=doc.get("is_active", True),
            created_at=doc["created_at"],
            last_login_at=doc.get("last_login_at"),
        )


class UserUpdate(BaseModel):
    """Fields the user is allowed to change about themselves."""
    name: Optional[str] = None
    age: Optional[int] = Field(default=None, ge=0, le=150)
    gender: Optional[str] = None
    city: Optional[str] = None
    language: Optional[str] = None
