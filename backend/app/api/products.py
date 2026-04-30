import logging

from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorCollection

from app.core.dependencies import get_current_user, get_products_collection
from app.schemas.product import ProductOut

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/products", tags=["products"])


@router.get("/{product_id}", response_model=ProductOut)
async def get_product(
    product_id: str,
    products: AsyncIOMotorCollection = Depends(get_products_collection),
    _current_user: dict = Depends(get_current_user),
) -> ProductOut:
    try:
        oid = ObjectId(product_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    doc = await products.find_one({"_id": oid})
    if not doc:
        raise HTTPException(status_code=404, detail="Product not found")

    logger.info("[REQUEST] GET /products/%s — found", product_id)
    return ProductOut.from_document(doc)
