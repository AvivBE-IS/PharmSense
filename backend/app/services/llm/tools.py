from langchain_core.tools import tool
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo.collation import Collation

from app.schemas.product import ProductOut

_COLLATION = Collation(locale="en", strength=2)  # case-insensitive, accent-insensitive


def make_search_tool(collection: AsyncIOMotorCollection):
    @tool
    async def search_medications(query: str) -> list:
        """Search for medications in the database by name, brand, or active ingredient."""
        cursor = collection.find(
            {
                "$or": [
                    {"name_en": query},
                    {"generic_name": query},
                    {"brand": query},
                    {"active_ingredient": query},
                ]
            },
            collation=_COLLATION,
        )
        docs = await cursor.to_list(length=10)
        return [ProductOut.from_document(doc).model_dump() for doc in docs]

    return search_medications
