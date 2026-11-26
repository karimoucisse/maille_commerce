from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.order import OrderStatus


class CheckoutRequest(BaseModel):
	shipping_name: str = Field(min_length=1, max_length=200)
	shipping_address: str = Field(min_length=1, max_length=300)
	shipping_postal_code: str = Field(min_length=1, max_length=20)
	shipping_city: str = Field(min_length=1, max_length=100)
	shipping_country: str = Field(default="FR", min_length=2, max_length=2)


class OrderItemOut(BaseModel):
	model_config = ConfigDict(from_attributes=True)

	product_name: str
	color: str
	size: str | None
	unit_price_cents: int
	quantity: int


class OrderOut(BaseModel):
	model_config = ConfigDict(from_attributes=True)

	id: int
	status: OrderStatus
	total_cents: int
	created_at: datetime
	items: list[OrderItemOut]

class OrderStatusUpdate(BaseModel):
	status: OrderStatus
