"""Seed admin user into MongoDB."""
import asyncio
import sys
import pathlib

sys.path.insert(0, str(pathlib.Path(__file__).parent))


async def main():
    from motor.motor_asyncio import AsyncIOMotorClient
    import bcrypt
    from datetime import datetime, timezone

    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["pharmsense"]
    users = db["users"]

    email = "admin@pharmsense.dev"
    existing = await users.find_one({"email": email})
    if existing:
        print("Admin user already exists, id:", str(existing["_id"]))
    else:
        hashed = bcrypt.hashpw(b"admin123", bcrypt.gensalt()).decode("utf-8")
        doc = {
            "email": email,
            "hashed_password": hashed,
            "full_name": "Admin",
            "is_active": True,
            "is_admin": True,
            "created_at": datetime.now(timezone.utc),
        }
        result = await users.insert_one(doc)
        print("Admin user created, id:", str(result.inserted_id))

    client.close()


asyncio.run(main())
