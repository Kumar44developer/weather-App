from fastapi import APIRouter, Depends, HTTPException, Query, status
import httpx


from app.api.dependencies import get_current_user
from app.core.config import settings
from app.models.user import User
from app.schemas.weather import CurrentWeatherResponse

router = APIRouter(prefix="/weather", tags=["weather"], dependencies=[Depends(get_current_user)])
