from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.product_schemas import ProductOut, ProductCreate
from app.services import product_service
from app.core.exceptions import NotFoundError
router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(
	color: str | None = None,
	in_stock: bool = False,
	limit: int = Query(20, ge=1, le=100),
	offset: int = Query(0, ge=0),
	db: Session = Depends(get_db),
):
	return product_service.list_products(
		db, color=color, in_stock=in_stock, limit=limit, offset=offset
	)


@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
	return product_service.get_by_slug(db, slug)


@router.delete("/{slug}")
def delete_product(slug: str, db: Session = get_db):
	success = product_service.delete_product_by_slug(db, slug)
	if not success:
		raise NotFoundError("Produit introuvable")
	return {"message": "Produit supprimé"}


@router.post("/", response_model=ProductCreate)
def create_product(product_data: ProductCreate, db: Session = get_db):
	product = product_service.create_product(db, product_data.model_dump())
	return product
