from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError
from app.core.security import hash_password, verify_password
from app.models.user import User
from app.schemas.user_schemas import UserCreate


def register(db: Session, data: UserCreate) -> User:
	email = data.email.lower()
	if db.scalars(select(User).where(User.email == email)).first():
		raise ConflictError("Cet email est déjà utilisé")

	user = User(
		email=email,
		hashed_password=hash_password(data.password),
		full_name=data.full_name,
	)
	db.add(user)
	try:
		db.commit()
	except IntegrityError:      # deux inscriptions simultanées avec le même email
		db.rollback()
		raise ConflictError("Cet email est déjà utilisé")
	db.refresh(user)
	return user


def authenticate(db: Session, email: str, password: str) -> User | None:
	user = db.scalars(select(User).where(User.email == email.lower())).first()
	if user is None or not verify_password(password, user.hashed_password):
		return None
	return user
