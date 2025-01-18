from pydantic import BaseModel

# Profile models for FastAPI
class ProfileResponse(BaseModel):
    first_name: str
    last_name: str
    email: str
    preferred_language: str

    class Config:
        orm_mode = True # Allows data to be parsed directly from Django models

class ProfileUpdate(BaseModel):
    first_name: str = None
    last_name: str = None
    preferred_language: str = None

class TokenRefreshRequest(BaseModel):
    refresh: str 

class TokenResponse(BaseModel):
    access: str
    refresh: str = None  


class ActivityLogResponse(BaseModel):
    date: str  # ISO formatted date string
    water_intake: int
    exercise_duration: int
    medication_count: int
    food_intake: int

    class Config:
        orm_mode = True  # Allows data to be parsed directly from Django models


