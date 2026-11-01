from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session


from app.core.security import decode_access_token
from app.db.session import get_db
from app.models.user import User

security = HTTPBearer()
