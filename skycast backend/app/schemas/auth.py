from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    """
    Schema for user registration.
    """
    name: str
    email: EmailStr
    password: str



class UserLogin(BaseModel):
    """
    Schema for user login.
    """
    email: EmailStr
    password: str

class Token(BaseModel):
    """
    Schema for JWT token response.
    """
    access_token: str
    token_type: str = "bearer"
