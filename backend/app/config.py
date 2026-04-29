"""
Application settings loaded from environment variables / .env file.
All other modules import `settings` from here — never import os.environ directly.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import model_validator
from typing import Any


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────────────
    APP_NAME: str = "PharmSense API"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # ── Database ─────────────────────────────────────────────────────────────
    # SQLite for local dev; override with a real URL in production.
    DATABASE_URL: str = "sqlite:///./pharmsense.db"

    # ── Security ─────────────────────────────────────────────────────────────
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    # ── Seed admin user ───────────────────────────────────────────────────────
    FIRST_ADMIN_EMAIL: str = "admin@pharmsense.dev"
    FIRST_ADMIN_PASSWORD: str = "admin123"

    # ── CORS ─────────────────────────────────────────────────────────────────
    # Stored as a comma-separated string in .env; parsed to a list at runtime.
    # Example: CORS_ORIGINS=http://localhost:5173,http://localhost:3000
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        """Return CORS_ORIGINS as a list of stripped origin strings."""
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


# Single shared instance — import this everywhere.
settings = Settings()
