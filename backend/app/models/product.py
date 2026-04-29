from typing import Annotated, List, Optional

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


class SideEffect(BaseModel):
    name: str
    frequency: str


class ProductDetails(BaseModel):
    contraindications: List[str]
    duration_of_action: str
    how_to_take: str
    interactions: str
    missed_dose: str
    overdose: str
    side_effects: List[SideEffect]
    storage: str


class ProductDocument(BaseModel):
    id: PyObjectId = Field(alias="_id")

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
    age_max_months: Optional[int] = None

    image_url: str
    tags: List[str]
    alternatives_ids: List[PyObjectId]

    details: ProductDetails

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

    @classmethod
    def from_mongo(cls, doc: dict) -> "ProductDocument":
        return cls.model_validate(doc)
