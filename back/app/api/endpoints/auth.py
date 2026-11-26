# POST /auth/register, POST /auth/login, GET /auth/me
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.security import create_access_token
from app.db.session import get_db
from app.models.user import User
from app.schemas.user_schemas import Token, UserCreate, UserOut
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
	return auth_service.register(db, data)


@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
	# Le formulaire OAuth2 impose le nom "username" : on y met l'email
	user = auth_service.authenticate(db, form.username, form.password)
	if user is None or not user.is_active:
		raise HTTPException(
			status_code=401,
			detail="Email ou mot de passe incorrect",
			headers={"WWW-Authenticate": "Bearer"},
		)
	return Token(access_token=create_access_token(user.id))


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
	return user
