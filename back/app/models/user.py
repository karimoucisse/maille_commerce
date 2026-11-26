from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class USER(Base):
	__tablename__ = "users"

	id: Mapped[int] = mapped_column(primary_key=True)
	name: Mapped[str] = mapped_column(String(100))
	phone: Mapped[str] = mapped_column(String(20))
	adress: Mapped[str] = mapped_column(String(200))
	postalCode: Mapped[str] = mapped_column(String(20))
	city: Mapped[str] = mapped_column(String(100))
	terms: Mapped[bool] = mapped_column(default=False)
	sex: Mapped[str] = mapped_column("men" | "women" | "other")
