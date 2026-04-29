from langchain_core.tools import tool
from motor.motor_asyncio import AsyncIOMotorCollection
import re
from typing import List

from app.schemas.product import ProductOut


def make_search_tool(collection: AsyncIOMotorCollection):
    @tool
    async def search_medications(
        query: str,
        symptom_tags: List[str] = [],
        target_audience: str = "",
    ) -> list:
        """Search for medications by name and/or symptom tags."""
        or_clauses = []

        # 1. Name-based search (regex) — only if a name was resolved
        if query:
            pattern = re.compile(re.escape(query), re.IGNORECASE)
            or_clauses += [
                {"name_en": pattern},
                {"generic_name": pattern},
                {"brand": pattern},
                {"active_ingredient": pattern},
            ]

        # 2. Tag-based search — broadens results when only symptoms given
        if symptom_tags:
            or_clauses.append({"tags": {"$in": symptom_tags}})

        if not or_clauses:
            return []

        db_query: dict = {"$or": or_clauses}

        # 3. Age filter for children
        if target_audience == "Child":
            db_query["age_min_months"] = {"$lte": 144}
        elif target_audience == "Infant":
            db_query["age_min_months"] = {"$lte": 12}

        cursor = collection.find(db_query)
        docs = await cursor.to_list(length=20)
        return [ProductOut.from_document(doc).model_dump() for doc in docs]

    return search_medications
