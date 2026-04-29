"""
Abstract repository base classes.

The Repository Pattern decouples business logic from the database.
To swap the database (e.g. SQLite → PostgreSQL, or SQLAlchemy → Motor):
  1. Create a new concrete class that inherits from AbstractUserRepository.
  2. Implement all abstract methods.
  3. Update the dependency in app/core/dependencies.py.
  4. Zero changes needed anywhere else.
"""

from abc import ABC, abstractmethod
from typing import Optional

from app.models.user import User


class AbstractUserRepository(ABC):
    """Contract that every user repository must fulfil."""

    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Return a User by primary key, or None if not found."""
        ...

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        """Return a User by email address (case-insensitive), or None."""
        ...

    @abstractmethod
    def create(self, email: str, hashed_password: str, full_name: Optional[str] = None) -> User:
        """Persist a new User record and return the created instance."""
        ...

    @abstractmethod
    def list_all(self) -> list[User]:
        """Return all users (used for admin tooling)."""
        ...
