from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(
	token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
) -> User:
	user_id = decode_access_token(token)
	user = db.get(User, user_id) if user_id is not None else None
	if user is None or not user.is_active:
		raise HTTPException(
			status_code=401,
			detail="Identifiants invalides",
			headers={"WWW-Authenticate": "Bearer"},
		)
	return user


def require_admin(user: User = Depends(get_current_user)) -> User:
	if not user.is_admin:
		raise HTTPException(status_code=403, detail="Accès réservé aux administrateurs")
	return user
