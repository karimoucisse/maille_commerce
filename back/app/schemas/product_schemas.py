from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class ProductCreate(BaseModel):
	slug: str = Field(..., max_length=200)
	name: str = Field(..., max_length=200)
	description: str | None = Field(None, max_length=1000)
	color: str = Field(..., max_length=100)
	size: str | None = Field("unique", max_length=50)
	price: float
	stock: int = 0

	model_config = ConfigDict(from_attributes=True)

class ProductRead(BaseModel):
	id: int
	slug: str
	name: str
	description: str | None = None
	color: str
	size: str | None = "unique"
	price: float
	stock: int
	created_at: datetime

	model_config = ConfigDict(from_attributes=True)
