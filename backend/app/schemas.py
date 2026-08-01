from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .models import UserRole

# Auth Schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Optional[UserRole] = UserRole.user

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Track Schemas
class TrackCreate(BaseModel):
    title: str
    genre: str
    bpm: int
    musical_key: str
    technical_challenge: Optional[str] = None


class TrackResponse(TrackCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# FAQ Schemas
class FAQCreate(BaseModel):
    category: str
    question: str
    answer: str

class FAQResponse(FAQCreate):
    id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
