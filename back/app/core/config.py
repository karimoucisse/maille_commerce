# settings (pydantic-settings)
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
	"""Application settings."""

	app_name: str = "My Commerce"

	secret_key: str
	cors_origins: list[str] = ["http://localhost:5173"]  # ton front React
	postgres_host: str
	postgres_port: int
	postgres_user: str
	postgres_password: str
	postgres_db: str
	model_config = SettingsConfigDict(env_file=".env", env_prefix="CM_")


@lru_cache
def get_settings() -> Settings:
	settings = Settings()
	return settings
