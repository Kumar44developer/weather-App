from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.auth import UserResponse

router = APIRouter(prefix="/me", tags=["user"])

@router.get("", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)) -> UserResponse:
    """
    Get current authenticated user information (protected route).
    """
    return UserResponse(id=current_user.id, name=current_user.name, email=current_user.email)
