"""
Pydantic schemas for authentication endpoints.

These are the API contract — completely separate from ORM models.
Changing a database column never forces a change here, and vice versa.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict


# ── Request bodies ────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ── Response bodies ───────────────────────────────────────────────────────────

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    """Public user representation — never exposes hashed_password."""
    id: int
    email: EmailStr
    full_name: Optional[str]
    is_active: bool
    is_admin: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
