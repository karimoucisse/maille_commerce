from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, Integer, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.product import Product


class Cart(Base):
	__tablename__ = "carts"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	user_id: Mapped[int] = mapped_column(
		ForeignKey("users.id", ondelete="CASCADE"), unique=True
	)
	created_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=True), server_default=func.now(), nullable=False
	)
	updated_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
	)

	items: Mapped[list["CartItem"]] = relationship(
		back_populates="cart", cascade="all, delete-orphan"
	)


class CartItem(Base):
	__tablename__ = "cart_items"
	__table_args__ = (
		UniqueConstraint("cart_id", "product_id", name="uq_cart_items_cart_product"),
		CheckConstraint("quantity > 0", name="ck_cart_items_quantity_positive"),
	)

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	cart_id: Mapped[int] = mapped_column(
		ForeignKey("carts.id", ondelete="CASCADE"), index=True
	)
	product_id: Mapped[int] = mapped_column(
		ForeignKey("products.id", ondelete="CASCADE")
	)
	quantity: Mapped[int] = mapped_column(Integer, default=1)

	cart: Mapped[Cart] = relationship(back_populates="items")
	product: Mapped[Product] = relationship()
