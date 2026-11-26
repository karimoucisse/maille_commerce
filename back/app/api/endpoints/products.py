from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.product_schemas import ProductRead, ProductCreate
from app.services import product_service

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[ProductRead])
def get_products(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return product_service.get_products(db, skip, limit)

@router.get("/{slug}", response_model=ProductRead)
def get_product(slug: str, db: Session = Depends(get_db)):
	product = product_service.get_product_by_slug(db, slug)
	if product is None:
		raise HTTPException(status_code=404, detail="Produit introuvable")
	return product

@router.delete("/{slug}")
def delete_product(slug: str, db: Session = Depends(get_db)):
	success = product_service.delete_product_by_slug(db, slug)
	if not success:
		raise HTTPException(status_code=404, detail="Produit introuvable")
	return {"message": "Produit supprimé"}

@router.post("/", response_model=ProductCreate)
def create_product(product_data: ProductCreate, db: Session = Depends(get_db)):
	product = product_service.create_product(db, product_data.model_dump())
	return product
