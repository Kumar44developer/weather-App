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
