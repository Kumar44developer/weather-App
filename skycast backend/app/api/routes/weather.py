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
async def get_current_weather(
  city: str = Query(..., description="City name, e.g. London"),
  current_user: User = Depends(get_current_user),
) -> CurrentWeatherResponse:
  """
  Fetch current weather for a city from OpenWeather API.
  """
  if not settings.openweather_api_key:
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="OpenWeather API key is not configured on the server",
    )
  params = {
    "q": city,
    "appid": settings.openweather_api_key,
    "units": settings.openweather_default_units,
  }


  try:
    async with httpx.AsyncClient(timeout=10.0) as client:
      resp = await client.get(settings.openweather_base_url, params=params)
  except httpx.RequestError as exc:
    raise HTTPException(
      status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
      detail=f"Error communicating with OpenWeather API: {exc}",
    ) from exc

  if resp.status_code != 200:
    # Pass through error from OpenWeather when possible
    try:
      data = resp.json()
      message = data.get("message", "Failed to fetch weather data")
    except Exception:
      message = "Failed to fetch weather data"
