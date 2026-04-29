"""
Application settings loaded from environment variables / .env file.
All other modules import `settings` from here — never import os.environ directly.
"""

from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── App ──────────────────────────────────────────────────────────────────
    APP_NAME: str = "PharmSense API"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # ── MongoDB Atlas ─────────────────────────────────────────────────────────
    MONGODB_URI: str
    MONGODB_DB_NAME: str 
    MONGODB_USERS_COLLECTION: str = "Users"
    MONGODB_PRODUCTS_COLLECTION: str = "Products"

    # ── Security ─────────────────────────────────────────────────────────────
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440   # 24 h
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # ── CORS ─────────────────────────────────────────────────────────────────
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    # ── LLM ──────────────────────────────────────────────────────────────────
    LLM_PROVIDER: Literal["openai", "anthropic", "gemini"] = "openai"
    LLM_MODEL: str = "gpt-4o-mini"
    LLM_TEMPERATURE: float = Field(default=0.2, ge=0.0, le=2.0)

    # API keys — only the key matching LLM_PROVIDER is required at runtime
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
    )


settings = Settings()
