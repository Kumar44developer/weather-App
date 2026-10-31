from fastapi import APIRouter, Depends, HTTPException, Query, status
import httpx


from app.api.dependencies import get_current_user
from app.core.config import settings
from app.models.user import User
from app.schemas.weather import CurrentWeatherResponse

router = APIRouter(prefix="/weather", tags=["weather"], dependencies=[Depends(get_current_user)])


@router.get("/health", summary="Health check for weather API")
async def health_check(current_user: User = Depends(get_current_user)) -> dict:
  return {"status": "ok", "service": "weather", "user_id": current_user.id}

@router.get(
  "",
  response_model=CurrentWeatherResponse,
  summary="Get current weather for a city from OpenWeather",
)
