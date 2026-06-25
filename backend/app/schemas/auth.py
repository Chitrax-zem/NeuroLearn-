from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    full_name: str
    phone_number: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    full_name: str
    phone_number: Optional[str]
    email: str
    avatar_url: Optional[str]
    level: int
    xp: int
    streak: int
    created_at: datetime

    class Config:
        from_attributes = True