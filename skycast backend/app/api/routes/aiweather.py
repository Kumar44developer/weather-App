from fastapi import APIRouter, Depends, HTTPException, Query, status
import httpx


from app.api.dependencies import get_current_user
from app.core.config import settings
from app.core.llm import get_weather_advice
from app.models.user import User
