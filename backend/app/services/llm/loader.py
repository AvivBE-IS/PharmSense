import logging

from langchain_community.document_loaders.mongodb import MongodbLoader

from app.config import settings

logger = logging.getLogger(__name__)


async def load_medication_names() -> list[str]:
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