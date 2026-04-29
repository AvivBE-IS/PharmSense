"""
Models package.
Import all ORM models here so that init_db.create_tables()
can discover them via Base.metadata.
"""

from app.models.user import User  # noqa: F401

__all__ = ["User"]
