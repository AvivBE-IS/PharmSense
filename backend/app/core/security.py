"""
Password hashing and JWT token utilities.

Nothing in this module depends on the database or the HTTP layer —
it is pure cryptographic logic that can be unit-tested in isolation.
"""

from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import bcrypt as _bcrypt
from jose import JWTError, jwt

from app.config import settings

# ── Password hashing ───────────────────────────────────────────────────


def hash_password(plain_password: str) -> str:
    """Return the bcrypt hash of the given plain-text password."""
    hashed = _bcrypt.hashpw(plain_password.encode("utf-8"), _bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True if plain_password matches the stored hash."""
    return _bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


# ── JWT tokens ────────────────────────────────────────────────────────────────

def create_access_token(
    subject: Any,
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    Create a signed JWT access token.

    Args:
        subject: The value to store in the ``sub`` claim (typically user id).
        expires_delta: Custom expiry. Defaults to settings.ACCESS_TOKEN_EXPIRE_MINUTES.

    Returns:
        Encoded JWT string.
    """
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload = {"sub": str(subject), "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_token(token: str) -> Optional[str]:
    """
    Decode and validate a JWT token.

    Returns:
        The ``sub`` claim value on success, or None if the token is invalid/expired.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None
