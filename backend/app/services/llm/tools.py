import json
import logging

from langchain_core.tools import tool
from motor.motor_asyncio import AsyncIOMotorCollection

from app.schemas.product import ProductOut

logger = logging.getLogger(__name__)


def make_search_tool(collection: AsyncIOMotorCollection):
    @tool
    async def search_products(filter: dict) -> list:
        """Search for pharmaceutical products using a MongoDB filter document."""
        logger.info("[TOOL:search_products] filter fields : %s", list(filter.keys()))
        logger.info("[TOOL:search_products] filter values :\n%s", json.dumps(filter, indent=2, default=str))
        cursor = collection.find(filter)
        docs = await cursor.to_list(length=20)
        results = [ProductOut.from_document(doc).model_dump() for doc in docs]
        logger.info("[TOOL:search_products] matched products: %s", [r.get("name_en") for r in results])
        return results

    return search_products
