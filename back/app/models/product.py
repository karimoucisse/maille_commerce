from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Product(Base):
	__tablename__ = "products"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	slug: Mapped[str] = mapped_column(String(200), unique=True, index=True)
	name: Mapped[str] = mapped_column(String(200))
	description: Mapped[str | None] = mapped_column(String(1000))
	color: Mapped[str] = mapped_column(String(100))
	size: Mapped[str | None] = mapped_column(String(50), default="unique")
	price: Mapped[float] = mapped_column(Float, nullable=False)
	stock: Mapped[int] = mapped_column(default=0)
	created_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=True), server_default=func.now(), nullable=False
	)
