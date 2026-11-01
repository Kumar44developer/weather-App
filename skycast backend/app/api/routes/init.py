from fastapi import APIRouter

from .routes import ai_weather, auth, me, weather

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(weather.router)
api_router.include_router(ai_weather.router)
api_router.include_router(me.router)
