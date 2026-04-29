"""
Tests for POST /api/v1/auth/login and GET /api/v1/auth/me.
"""

import pytest
from fastapi.testclient import TestClient

from app.config import settings

LOGIN_URL = "/api/v1/auth/login"
ME_URL = "/api/v1/auth/me"

ADMIN_EMAIL = settings.FIRST_ADMIN_EMAIL
ADMIN_PASSWORD = settings.FIRST_ADMIN_PASSWORD


class TestLogin:
    def test_login_success(self, client: TestClient) -> None:
        response = client.post(LOGIN_URL, json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_wrong_password(self, client: TestClient) -> None:
        response = client.post(LOGIN_URL, json={"email": ADMIN_EMAIL, "password": "wrongpassword"})
        assert response.status_code == 401

    def test_login_nonexistent_user(self, client: TestClient) -> None:
        response = client.post(LOGIN_URL, json={"email": "nobody@pharmsense.dev", "password": "irrelevant"})
        assert response.status_code == 401

    def test_login_invalid_email_format(self, client: TestClient) -> None:
        response = client.post(LOGIN_URL, json={"email": "not-an-email", "password": "password"})
        assert response.status_code == 422


class TestGetMe:
    def _get_token(self, client: TestClient) -> str:
        response = client.post(LOGIN_URL, json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        return response.json()["access_token"]

    def test_get_me_authenticated(self, client: TestClient) -> None:
        token = self._get_token(client)
        response = client.get(ME_URL, headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == ADMIN_EMAIL
        assert "hashed_password" not in data

    def test_get_me_no_token(self, client: TestClient) -> None:
        response = client.get(ME_URL)
        assert response.status_code in (401, 403)

    def test_get_me_invalid_token(self, client: TestClient) -> None:
        response = client.get(ME_URL, headers={"Authorization": "Bearer invalidtoken"})
        assert response.status_code == 401
