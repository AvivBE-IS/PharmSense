"""
SQLAlchemy engine, session factory, and declarative Base.

All ORM models must import Base from here and add themselves
to __all__ in app/models/__init__.py so that create_all() picks them up.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.config import settings

# ── Engine ────────────────────────────────────────────────────────────────────
# connect_args is required for SQLite to allow use across threads (FastAPI workers).
# It is ignored by other dialects, so it is safe to leave in when swapping DB.
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=settings.DEBUG,  # Log SQL statements in development
)

# ── Session factory ───────────────────────────────────────────────────────────
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ── Declarative base ──────────────────────────────────────────────────────────
class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass
