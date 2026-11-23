# settings (pydantic-settings)
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
	"""Application settings."""
	app_name: str = "My Commerce"

	database_url: str
	secret_key: str
	access_token_minutes: int = 30
	cors_origins: list[str] = ["http://localhost:5173"]  # ton front React

	model_config = SettingsConfigDict(env_file=".env", env_prefix="CM_")


@lru_cache
def get_settings() -> Settings:
	settings = Settings()
	return settings
