from fastapi import APIRouter, Depends, HTTPException, Query, status
import httpx


from app.api.dependencies import get_current_user
from app.core.config import settings
from app.core.llm import get_weather_advice
from app.models.user import User
from app.schemas.ai_weather import (
    WeatherAIRequest,
    WeatherAIResponse,
    WeatherQuestionRequest,
    WeatherQuestionResponse,
)

router = APIRouter(prefix="/ai-weather", tags=["ai-weather"], dependencies=[Depends(get_current_user)])

async def fetch_weather_data(city: str) -> dict:
    """
    Fetch weather data from OpenWeather API.
    Returns a dictionary with weather information.
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
        try:
            data = resp.json()
            message = data.get("message", "Failed to fetch weather data")
        except Exception:
            message = "Failed to fetch weather data"


        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"OpenWeather API error: {message}",
        )
