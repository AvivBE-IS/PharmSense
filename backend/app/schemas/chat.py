from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.product import ProductOut


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="User message text")
    locale: Optional[str] = Field(
        None,
        max_length=35,
        pattern=r"^[A-Za-z0-9]{2,8}(?:-[A-Za-z0-9]{1,8})*$",
        description="BCP-47 locale tag (e.g. 'he', 'ar', 'en', 'ru', 'zh-Hans').",
    )


class ChatResponse(BaseModel):
    results: List[ProductOut]
