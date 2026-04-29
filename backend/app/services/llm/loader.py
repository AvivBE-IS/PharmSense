import logging
from typing import List

from langchain_community.document_loaders.mongodb import MongodbLoader
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings

logger = logging.getLogger(__name__)


async def load_medication_names() -> List[str]:
    loader = MongodbLoader(
        connection_string=settings.MONGODB_URI,
        db_name=settings.MONGODB_DB_NAME,
        collection_name=settings.MONGODB_PRODUCTS_COLLECTION,
        field_names=["name_en"],
    )
    docs = await loader.aload()
    names = [doc.page_content.strip() for doc in docs if doc.page_content.strip()]
    logger.info("Loaded %d medication names from MongoDB", len(names))
    return names


async def load_tags() -> List[str]:
    """Load all unique tags from the products collection."""
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.MONGODB_DB_NAME]
    collection = db[settings.MONGODB_PRODUCTS_COLLECTION]
    docs = await collection.find({}, {"tags": 1, "_id": 0}).to_list(length=None)
    all_tags: set = set()
    for doc in docs:
        for tag in doc.get("tags", []):
            all_tags.add(tag)
    client.close()
    result = sorted(all_tags)
    logger.info("Loaded %d unique tags from MongoDB", len(result))
    return result