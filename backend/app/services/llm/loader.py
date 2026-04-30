import logging

from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings

logger = logging.getLogger(__name__)


async def load_product_schema() -> str:
    """Fetch sample products and return a human-readable schema string for the LLM."""
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    try:
        collection = client[settings.MONGODB_DB_NAME][settings.MONGODB_PRODUCTS_COLLECTION]
        docs = await collection.find({}).to_list(length=5)
        if not docs:
            logger.warning("No products found — schema will be empty")
            return "No products found in the database."

        field_info: dict[str, tuple[str, object]] = {}
        for doc in docs:
            for key, value in doc.items():
                if key == "_id" or key in field_info:
                    continue
                if isinstance(value, dict):
                    sub = ", ".join(f"{k}: {type(v).__name__}" for k, v in value.items())
                    field_info[key] = ("dict", f"{{{sub}}}")
                else:
                    field_info[key] = (type(value).__name__, value)

        lines = []
        for field, (type_name, example) in field_info.items():
            example_str = str(example)
            if len(example_str) > 60:
                example_str = example_str[:60] + "..."
            lines.append(f"- {field} ({type_name}): e.g. {example_str}")

        schema = "\n".join(lines)
        logger.info("Derived product schema with %d field(s)", len(field_info))
        return schema
    finally:
        client.close()
