from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class User(Base):
	__tablename__ = "users"

	id: Mapped[int] = mapped_column(Integer, primary_key=True)
	phone: Mapped[str] = mapped_column(String(20))
	email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
	hashed_password: Mapped[str] = mapped_column(String(255))
	full_name: Mapped[str | None] = mapped_column(String(200))
	is_active: Mapped[bool] = mapped_column(Boolean, default=True)
	is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
	created_at: Mapped[datetime] = mapped_column(
		DateTime(timezone=True), server_default=func.now(), nullable=False
	)
	# sex: Mapped[str] = mapped_column("men" | "women" | "other")
	adress: Mapped[str] = mapped_column(String(200), default="")
	city: Mapped[str] = mapped_column(String(100), default="")
	postalCode: Mapped[str] = mapped_column(String(20), default="")
	terms: Mapped[bool] = mapped_column(default=False)
