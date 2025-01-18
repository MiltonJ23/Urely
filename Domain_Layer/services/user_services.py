from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
import os, sys

from DataLayer.health.models import ActivityLog
from .models import UserProfile
from .models import ProfileResponse
from .authenticate_user import authenticate_user  

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))    

# Fetch user profile based on authenticated user
def get_user_profile(token: str = Depends(authenticate_user)):
    # The authenticate_user function should return a user instance or user ID
    user = get_user_from_token(token)  # Function to retrieve user object from token (your implementation)

    try:
        # Fetch the user profile from the database
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        raise HTTPException(status_code=404, detail="User profile not found")

    # Convert the Django model to Pydantic model (ProfileResponse)
    return ProfileResponse.from_orm(profile)


import jwt
from fastapi import HTTPException, status
from typing import Optional, Type

import os, sys
from django import setup

# Set the environment variable
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# Add the Django project to the python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Iniitialize Django
setup()
from django.conf import settings
from django.db.models import QuerySet

settings.configure()

# Assuming you have JWT_SECRET_KEY set in your Django settings
JWT_SECRET_KEY = 'django-insecure-i-89pggp2^6=59zz*u_a=i_y^@b%q43pijbr&9j9k36&(ye&x)'
JWT_ALGORITHM = 'HS256'  # This can vary depending on your token configuration

User = settings.AUTH_USER_MODEL

def get_user_from_token(token: str) -> Optional[Type[User]]:
    """
    Decodes the JWT token and retrieves the user associated with the token.
    """
    try:
        # Decode the token to get the user info (usually user ID)
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])

        # Extract user ID from the payload
        user_id = payload.get('user_id')

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token is invalid, user ID not found"
            )

        # Fetch the user object from the database using the user ID
        User = settings.AUTH_USER_MODEL  # This dynamically fetches the user model used in Django
        user = User.objects.get(id=user_id)

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid"
        )
    except User.DoesNotExist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user

def get_activity_logs_by_user(user) -> QuerySet:
    """
    Retrieve all activity logs for a specific user.
    
    Args:
        user: The user instance for whom the activity logs are to be retrieved.
    
    Returns:
        QuerySet: A queryset of ActivityLog objects filtered by the given user.
    """
    if user is None:
        raise ValueError("A valid user instance must be provided.")
    
    return ActivityLog.objects.filter(user=user).order_by('-date')