"""Seed admin user into MongoDB."""
import asyncio
import sys
import pathlib

sys.path.insert(0, str(pathlib.Path(__file__).parent))


async def main():
    from motor.motor_asyncio import AsyncIOMotorClient
    import bcrypt
    from datetime import datetime, timezone

    import os
    from dotenv import load_dotenv
    load_dotenv(pathlib.Path(__file__).parent / ".env")
    uri = os.getenv("MONGODB_URI")
    client = AsyncIOMotorClient(uri)
    db_name = os.getenv("MONGODB_DB_NAME")
    db = client[db_name]
    users_collection_name = os.getenv("MONGODB_USERS_COLLECTION", "Users")
    users = db[users_collection_name]

    email = "admin@pharmsense.dev"
    hashed = bcrypt.hashpw(b"admin123", bcrypt.gensalt()).decode("utf-8")
    now = datetime.now(timezone.utc)

    doc = {
        "name": "Admin",
        "email": email,
        "password_hash": hashed,
        "age": 0,
        "gender": "other",
        "city": "HQ",
        "language": "en",
        "is_active": True,
        "created_at": now,
        "updated_at": now,
        "last_login_at": None,
    }

    result = await users.replace_one({"email": email}, doc, upsert=True)

    if result.upserted_id:
        print("Admin user created, id:", str(result.upserted_id))
    else:
        print("Admin user updated (existing doc replaced)")

    client.close()


asyncio.run(main())
