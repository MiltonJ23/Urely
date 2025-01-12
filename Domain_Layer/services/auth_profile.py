import requests
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

# Django API URLs
DJANGO_PROFILE_URL = "http://localhost:8000/api/auth/profile/" 
DJANGO_VERIFY_TOKEN_URL = "http://localhost:8000/api/auth/token/verify"
DJANGO_TOKEN_REFRESH_URL = "http://localhost:8000/api/auth/token/refresh" 

# OAuth2 scheme for token handling
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

class TokenRefreshRequest(BaseModel):
    refresh: str 

class TokenResponse(BaseModel):
    access: str
    refresh: str = None  

    
def authenticate_user(token: str = Depends(oauth2_scheme)):
    """
    Validate the token and retrieve the associated user from Django.
    """
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.post(DJANGO_VERIFY_TOKEN_URL, headers=headers)
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is unavailable"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json().get("detail", "Invalid authentication credentials")
        )
    
    # Return the user details from Django
    return response.json()


@router.post("/token/refresh", response_model=TokenResponse)
def refresh_token(request: TokenRefreshRequest):
    """
    Refresh the access token by calling the Django refresh endpoint.
    """
    try:
        response = requests.post(DJANGO_TOKEN_REFRESH_URL, data=request.dict())
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Authentication service unavailable")

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

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
