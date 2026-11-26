from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProductCreate(BaseModel):
	slug: str = Field(min_length=1, max_length=200,
	                  pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
	name: str = Field(min_length=1, max_length=200)
	description: str | None = Field(default=None, max_length=1000)
	color: str = Field(min_length=1, max_length=100)
	size: str | None = Field(default="unique", max_length=50)
	price: float = Field(gt=0)
	stock: int = Field(default=0, ge=0)


class ProductUpdate(BaseModel):
	slug: str | None = Field(default=None, min_length=1, max_length=200,
	                         pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
	name: str | None = Field(default=None, min_length=1, max_length=200)
	description: str | None = Field(default=None, max_length=1000)
	color: str | None = Field(default=None, min_length=1, max_length=100)
	size: str | None = Field(default=None, max_length=50)
	price: float | None = Field(default=None, gt=0)
	stock: int | None = Field(default=None, ge=0)


class ProductOut(ProductCreate):
	model_config = ConfigDict(from_attributes=True)

	id: int
	created_at: datetime
