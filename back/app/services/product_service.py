from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product


def get_products(db: Session, skip: int = 0, limit: int = 50) -> list[Product]:
	stmt = select(Product).order_by(Product.id).offset(skip).limit(limit)
	return list(db.scalars(stmt))


def get_product_by_slug(db: Session, slug: str) -> Product | None:
	return db.scalar(select(Product).where(Product.slug == slug))


def delete_product_by_slug(db: Session, slug: str) -> bool:
	product = db.scalar(select(Product).where(Product.slug == slug))
	if product:
		db.delete(product)
		db.commit()
		return True
	return False


def create_product(db: Session, product_data: dict) -> Product:
	product = Product(**product_data)
	db.add(product)
	db.commit()
	db.refresh(product)
	return product
