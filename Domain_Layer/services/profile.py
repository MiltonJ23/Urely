import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

# Django API URLs
DJANGO_PROFILE_URL = "http://localhost:3001/api/auth/profile/"  

# OAuth2 scheme for token handling
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

router = APIRouter()

# Profile models for FastAPI
class ProfileResponse(BaseModel):
    first_name: str
    last_name: str
    email: str
    preferred_language: str

class ProfileUpdate(BaseModel):
    first_name: str = None
    last_name: str = None
    preferred_language: str = None

def authenticate_user(token: str = Depends(oauth2_scheme)):
    # Replace this with actual authentication logic
    return token  # Assume token is passed directly to Django

@router.get("/profile", response_model=ProfileResponse)
def get_profile(token: str = Depends(authenticate_user)):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(DJANGO_PROFILE_URL, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()

@router.put("/profile", response_model=ProfileResponse)
def update_profile(update: ProfileUpdate, token: str = Depends(authenticate_user)):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(DJANGO_PROFILE_URL, json=update.dict(exclude_unset=True), headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return response.json()
