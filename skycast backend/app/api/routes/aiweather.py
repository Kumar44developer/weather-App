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

    data = resp.json()

    # Extract required fields
    try:
        temperature = float(data["main"]["temp"])
        humidity = int(data["main"]["humidity"])
        wind = float(data["wind"]["speed"])
        description = str(data["weather"][0]["description"])
        city_name = str(data.get("name") or city)
    except (KeyError, IndexError, TypeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Unexpected response structure from OpenWeather: {exc}",
        ) from exc

    return {
        "city": city_name,
        "temperature": temperature,
        "humidity": humidity,
        "wind": wind,
        "description": description,
    }

@router.post("", response_model=WeatherAIResponse)
async def ask_weather_ai(
    request: WeatherAIRequest,
    current_user: User = Depends(get_current_user),
) -> WeatherAIResponse:
    """
    Ask Weather AI a question based on current weather conditions (protected route).
    
    Input:
    - city: City name to get weather for
    - question: User's question about the weather

    
    Output:
    - advice: AI-generated advice based on weather data and question
    """
    # Fetch weather data for the city
    weather_data = await fetch_weather_data(request.city)
    
    # Get AI advice based on weather data and user question
    ai_advice = await get_weather_advice(weather_data, request.question)
    
    return WeatherAIResponse(advice=ai_advice)


@router.post("/ask", response_model=WeatherQuestionResponse)
async def ask_weather_ai_legacy(
    request: WeatherQuestionRequest,
    city: str = Query(..., description="City name to get weather for, e.g. London"),
    current_user: User = Depends(get_current_user),
) -> WeatherQuestionResponse:
    """
    Legacy endpoint: Ask Weather AI a question (kept for backward compatibility).
    Use POST /ai-weather instead with city and question in request body.
    """
