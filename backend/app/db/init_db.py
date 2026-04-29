"""
Database initialisation helpers.

Called once at application startup (via lifespan in main.py).
Creates all tables and seeds the first admin user if the DB is empty.
"""

import logging

from sqlalchemy.orm import Session

from app.db.base import Base, engine, SessionLocal

logger = logging.getLogger(__name__)


def create_tables() -> None:
    """Create all tables defined by ORM models registered on Base.metadata."""
    # Import all models here so SQLAlchemy registers them on Base.metadata
    # before create_all() is called.
    import app.models  # noqa: F401 — side-effect import

    logger.info("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables ready.")


def seed_admin_user(db: Session) -> None:
    """
    Create the initial admin user if no users exist yet.
    Credentials are read from settings so they can be overridden in .env.
    """
    from app.config import settings
    from app.models.user import User
    from app.core.security import hash_password

    if db.query(User).first() is not None:
        return  # DB already has users — skip seeding

    admin = User(
        email=settings.FIRST_ADMIN_EMAIL,
        hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
        full_name="Admin",
        is_active=True,
        is_admin=True,
    )
    db.add(admin)
    db.commit()
    logger.info("Seeded admin user: %s", settings.FIRST_ADMIN_EMAIL)


def init_db() -> None:
    """Full DB initialisation: create tables then seed data."""
    create_tables()
    db = SessionLocal()
    try:
        seed_admin_user(db)
    finally:
        db.close()
