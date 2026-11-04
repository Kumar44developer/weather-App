from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    """
    Schema for user registration.
    """
    name: str
    email: EmailStr
    password: str
