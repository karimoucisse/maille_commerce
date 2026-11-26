from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError, NotFoundError
from app.models.product import Product
from app.schemas.product_schemas import ProductCreate, ProductUpdate


def _commit(db: Session) -> None:
	try:
		db.commit()
	except IntegrityError:
		db.rollback()
		raise ConflictError("Ce slug existe déjà")


def list_products(
	db: Session,
	*,
	color: str | None = None,
	in_stock: bool = False,
	limit: int = 20,
	offset: int = 0,
) -> list[Product]:
	stmt = select(Product).order_by(Product.id)
	if color:
		stmt = stmt.where(Product.color == color)
	if in_stock:
		stmt = stmt.where(Product.stock > 0)
	return list(db.scalars(stmt.limit(limit).offset(offset)))


def get_by_slug(db: Session, slug: str) -> Product:
	product = db.scalars(select(Product).where(Product.slug == slug)).first()
	if product is None:
		raise NotFoundError("Produit introuvable")
	return product


def get_by_id(db: Session, product_id: int) -> Product:
	product = db.get(Product, product_id)
	if product is None:
		raise NotFoundError("Produit introuvable")
	return product


def create(db: Session, data: ProductCreate) -> Product:
	product = Product(**data.model_dump())
	db.add(product)
	_commit(db)
	db.refresh(product)
	return product


def update(db: Session, product_id: int, data: ProductUpdate) -> Product:
	product = get_by_id(db, product_id)
	for field, value in data.model_dump(exclude_unset=True).items():
		setattr(product, field, value)
	_commit(db)
	db.refresh(product)
	return product


def delete(db: Session, product_id: int) -> None:
	product = get_by_id(db, product_id)
	db.delete(product)
	db.commit()
