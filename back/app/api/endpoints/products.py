from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.product import ProductOut
from app.services import product_service

# GET /products, GET /products/{slug}, GET /categories
router = APIRouter(prefix="/products", tags=["products"])



@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = product_service.get_product_by_slug(db, slug)
    if not product:
        raise HTTPException(404, "Product not found")
    return product
