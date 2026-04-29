"""
Pytest fixtures shared across all backend tests.

Uses an in-memory SQLite database so tests are:
  - Fast (no disk I/O)
  - Isolated (fresh DB per test session)
  - Safe (never touch the dev database)

The `get_db` FastAPI dependency is overridden to inject the test session,
keeping the rest of the application code completely unchanged.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.dependencies import get_db
from app.db.base import Base
from app.db.init_db import seed_admin_user
from app.main import app

# ── In-memory test database ───────────────────────────────────────────────────

TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db() -> None:
    """Create all tables once for the entire test session."""
    import app.models  # noqa: F401 — register models on Base.metadata
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def db_session() -> Session:
    """Provide a clean transactional session per test, rolled back after."""
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    seed_admin_user(session)  # Ensure test admin user exists

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db_session: Session) -> TestClient:
    """FastAPI test client with the DB dependency overridden."""
    def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
