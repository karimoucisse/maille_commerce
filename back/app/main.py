from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.db.session import get_db
from app.db.session import  engine
from app.api.endpoints import products
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.product import Product


# Base.metadata.create_all(bind=engine)
settings = get_settings()
app = FastAPI(title="Shop API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)

def root():
    return {"message": "Hello World"}

