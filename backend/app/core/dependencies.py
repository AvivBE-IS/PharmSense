"""
FastAPI dependency injection providers.

This is the SINGLE file that wires concrete implementations to abstract interfaces.
To swap the database implementation, change SQLAlchemyUserRepository to your new class here.
"""

from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.base import SessionLocal
from app.models.user import User
from app.repositories.user_repository import SQLAlchemyUserRepository

_bearer_scheme = HTTPBearer()


# ── Database session ──────────────────────────────────────────────────────────

def get_db() -> Generator[Session, None, None]:
    """
    Yield a SQLAlchemy session and ensure it is closed after the request.
    Override this dependency in tests to inject an in-memory session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ── Repository ────────────────────────────────────────────────────────────────

def get_user_repository(db: Session = Depends(get_db)) -> SQLAlchemyUserRepository:
    """
    Provide the concrete user repository bound to the current session.
    Swap this to return a different repository class to change the DB backend.
    """
    return SQLAlchemyUserRepository(db)


# ── Authenticated user ────────────────────────────────────────────────────────

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
    repo: SQLAlchemyUserRepository = Depends(get_user_repository),
) -> User:
    """
    Decode the Bearer JWT, look up the user, and return it.
    Raises HTTP 401 on any failure so routes stay clean.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    user_id_str = decode_token(credentials.credentials)
    if user_id_str is None:
        raise credentials_exception

    try:
        user_id = int(user_id_str)
    except ValueError:
        raise credentials_exception

    user = repo.get_by_id(user_id)
    if user is None or not user.is_active:
        raise credentials_exception

    return user
