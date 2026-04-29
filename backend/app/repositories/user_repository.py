"""
SQLAlchemy implementation of AbstractUserRepository.

This class is the ONLY place in the backend that writes SQLAlchemy
session calls for User data.  Services never touch the session directly.
"""

from typing import Optional

from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.base import AbstractUserRepository


class SQLAlchemyUserRepository(AbstractUserRepository):
    def __init__(self, db: Session) -> None:
        self._db = db

    def get_by_id(self, user_id: int) -> Optional[User]:
        return self._db.get(User, user_id)

    def get_by_email(self, email: str) -> Optional[User]:
        return (
            self._db.query(User)
            .filter(User.email == email.lower().strip())
            .first()
        )

    def create(
        self,
        email: str,
        hashed_password: str,
        full_name: Optional[str] = None,
    ) -> User:
        user = User(
            email=email.lower().strip(),
            hashed_password=hashed_password,
            full_name=full_name,
        )
        self._db.add(user)
        self._db.commit()
        self._db.refresh(user)
        return user

    def list_all(self) -> list[User]:
        return self._db.query(User).order_by(User.id).all()
