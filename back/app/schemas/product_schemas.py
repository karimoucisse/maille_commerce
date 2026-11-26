from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

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
