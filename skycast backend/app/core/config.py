from functools import lru_cache
import os
from typing import List


from dotenv import load_dotenv
from pydantic import AnyHttpUrl, BaseModel, field_validator

load_dotenv()


class Settings(BaseModel):
  """
  Application settings loaded from environment variables / .env file.
  """

  app_name: str = os.getenv("APP_NAME", "SkyCast Backend")
  environment: str = os.getenv("ENVIRONMENT", "development")
  api_v1_prefix: str = os.getenv("API_V1_PREFIX", "/api/v1")

database_url: str = os.getenv("DATABASE_URL", "sqlite:///./skycast.db")

  # JWT Authentication settings
  jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
  jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
  jwt_access_token_expire_minutes: int = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

  # OpenWeather API configuration
  openweather_api_key: str | None = os.getenv("OPENWEATHER_API_KEY")
  openweather_base_url: str = os.getenv(
    "OPENWEATHER_BASE_URL",
    "https://api.openweathermap.org/data/2.5/weather",
  )
  openweather_default_units: str = os.getenv("OPENWEATHER_UNITS", "metric")

  # OpenAI / LLM configuration
  openai_api_key: str | None = os.getenv("OPENAI_API_KEY")
  openai_model: str = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

  # Comma-separated list of origins, e.g. "http://localhost:5173,https://myapp.com"
  backend_cors_origins: List[AnyHttpUrl] | List[str] = os.getenv(
    "BACKEND_CORS_ORIGINS",
    "http://localhost:5173",
  ).split(",")
