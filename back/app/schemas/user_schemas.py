from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
	email: EmailStr
	password: str = Field(min_length=8, max_length=128)
	full_name: str | None = Field(default=None, max_length=200)
	


class UserOut(BaseModel):
	model_config = ConfigDict(from_attributes=True)

	id: int
	email: EmailStr
	full_name: str | None
	is_admin: bool


class Token(BaseModel):
	access_token: str
	token_type: str = "bearer"
