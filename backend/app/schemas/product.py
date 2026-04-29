from typing import List, Optional

from pydantic import BaseModel


class SideEffectOut(BaseModel):
    name: str
    frequency: str


class ProductDetailsOut(BaseModel):
    contraindications: List[str]
    duration_of_action: str
    how_to_take: str
    interactions: str
    missed_dose: str
    overdose: str
    side_effects: List[SideEffectOut]
    storage: str


class ProductOut(BaseModel):
    id: str
    name_en: str
    generic_name: str
    brand: str
    active_ingredient: str
    form: str
    dosage_strength: str

    price: float
    quantity_per_pack: int
    stock_count: int
    in_stock: bool
    is_active: bool
    prescription_required: bool

    pregnancy_safe: bool
    breastfeeding_safe: bool
    age_min_months: int
    age_max_months: Optional[int]

    image_url: str
    tags: List[str]
    alternatives_ids: List[str]

    details: ProductDetailsOut

    @classmethod
    def from_document(cls, doc: dict) -> "ProductOut":
        return cls(
            id=str(doc["_id"]),
            name_en=doc["name_en"],
            generic_name=doc["generic_name"],
            brand=doc["brand"],
            active_ingredient=doc["active_ingredient"],
            form=doc["form"],
            dosage_strength=doc["dosage_strength"],
            price=float(doc["price"]),
            quantity_per_pack=doc["quantity_per_pack"],
            stock_count=doc["stock_count"],
            in_stock=doc["in_stock"],
            is_active=doc["is_active"],
            prescription_required=doc["prescription_required"],
            pregnancy_safe=doc["pregnancy_safe"],
            breastfeeding_safe=doc["breastfeeding_safe"],
            age_min_months=doc["age_min_months"],
            age_max_months=doc.get("age_max_months"),
            image_url=doc["image_url"],
            tags=doc.get("tags", []),
            alternatives_ids=[str(oid) for oid in doc.get("alternatives_ids", [])],
            details=ProductDetailsOut(**{
                **doc["details"],
                "side_effects": [SideEffectOut(**se) for se in doc["details"].get("side_effects", [])],
            }),
        )
