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


class UserResponse(BaseModel):
    """
    Schema for user response (without password).
    """
    id: int
    name: str
    email: str


    class Config:
        from_attributes = True
