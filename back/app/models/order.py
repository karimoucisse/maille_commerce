import enum
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class OrderStatus(str, enum.Enum):
	PENDING = "pending"
	PAID = "paid"
	SHIPPED = "shipped"
	DELIVERED = "delivered"
	CANCELLED = "cancelled"


class Order(Base):
	__tablename__ = "orders"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	user_id: Mapped[int] = mapped_column(
		ForeignKey("users.id", ondelete="RESTRICT"), index=True
	)
	status: Mapped[OrderStatus] = mapped_column(
		Enum(OrderStatus, native_enum=False, length=20),
		default=OrderStatus.PENDING,
		index=True,
	)
	total_cents: Mapped[int] = mapped_column(Integer)

	# Adresse de livraison figée au moment de la commande
	shipping_name: Mapped[str] = mapped_column(String(200))
	shipping_address: Mapped[str] = mapped_column(String(300))
	shipping_postal_code: Mapped[str] = mapped_column(String(20))
	shipping_city: Mapped[str] = mapped_column(String(100))
	shipping_country: Mapped[str] = mapped_column(String(2), default="FR")

	created_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=True), server_default=func.now(), nullable=False
	)

	items: Mapped[list["OrderItem"]] = relationship(
		back_populates="order", cascade="all, delete-orphan"
	)


class OrderItem(Base):
	__tablename__ = "order_items"
	__table_args__ = (
		CheckConstraint("quantity > 0", name="ck_order_items_quantity_positive"),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	order_id: Mapped[int] = mapped_column(
		ForeignKey("orders.id", ondelete="CASCADE"), index=True
	)
	# nullable : si le produit est supprimé, la ligne de commande reste
	product_id: Mapped[int | None] = mapped_column(
		ForeignKey("products.id", ondelete="SET NULL")
	)

	# Snapshot du produit au moment de l'achat
	product_name: Mapped[str] = mapped_column(String(200))
	color: Mapped[str] = mapped_column(String(100))
	size: Mapped[str | None] = mapped_column(String(50))
	unit_price_cents: Mapped[int] = mapped_column(Integer)
	quantity: Mapped[int] = mapped_column(Integer)

	order: Mapped[Order] = relationship(back_populates="items")
