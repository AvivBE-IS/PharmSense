"""
UserDocument — mirrors the MongoDB users collection exactly.

This class is used internally (service layer, DB reads/writes).
It is NEVER returned directly from an API endpoint — use schemas/user.py for that.
"""

from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field
from pydantic import BeforeValidator


# Converts ObjectId → str automatically when loading from MongoDB
PyObjectId = Annotated[str, BeforeValidator(str)]


class UserDocument(BaseModel):
    id: PyObjectId = Field(alias="_id")

    # ── Identity ──────────────────────────────────────────────────────────────
    name: str
    email: EmailStr
    password_hash: str          # bcrypt — never exposed outside this layer

    # ── Demographics ──────────────────────────────────────────────────────────
    age: int = Field(ge=0, le=150)
    gender: str
    city: str
    language: str               # e.g. "en", "he", "ar"

    # ── Access control ────────────────────────────────────────────────────────
    is_active: bool = True

    # ── Timestamps ────────────────────────────────────────────────────────────
    created_at: datetime
    updated_at: datetime
    last_login_at: Optional[datetime] = None

    model_config = ConfigDict(
        populate_by_name=True,      # allow both 'id' and '_id'
        arbitrary_types_allowed=True,
    )

    @classmethod
    def from_mongo(cls, doc: dict) -> "UserDocument":
        """Build a UserDocument from a raw Motor/PyMongo result dict."""
        return cls.model_validate(doc)
