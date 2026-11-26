from pydantic import BaseModel, ConfigDict, Field, computed_field

from app.schemas.product_schemas import ProductOut


class CartItemAdd(BaseModel):
	product_id: int
	quantity: int = Field(default=1, ge=1, le=99)


class CartItemUpdate(BaseModel):
	quantity: int = Field(ge=1, le=99)


class CartItemOut(BaseModel):
	model_config = ConfigDict(from_attributes=True)

	id: int
	quantity: int
	product: ProductOut

	@computed_field
	@property
	def line_total_cents(self) -> int:
		return round(self.product.price * 100) * self.quantity


class CartOut(BaseModel):
	model_config = ConfigDict(from_attributes=True)

	id: int
	items: list[CartItemOut]

	@computed_field
	@property
	def total_cents(self) -> int:
		return sum(item.line_total_cents for item in self.items)
