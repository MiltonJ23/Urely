# Import your authentication utility
from fastapi import APIRouter, Depends, HTTPException, status
import os, sys, django
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DataLayer.core.settings")
django.setup()
from Domain_Layer.services.authenticate_user import authenticate_user
from Domain_Layer.services.models import ProfileResponse, ActivityLogResponse  # Import your response models
from Domain_Layer.services.user_services import get_user_profile, get_activity_logs_by_user  # Import your service function

router = APIRouter()

# Example of a protected route that requires authentication
@router.get("/profile", response_model=ProfileResponse)
def get_profile(token: str = Depends(authenticate_user)):
    """
    This route is protected and will only return the profile
    if the user is authenticated with a valid token.
    """
    # Now that `token` has been validated, you can proceed with business logic
    # For example, getting the profile of the authenticated user
    try:
        # Assuming `authenticate_user` returns the user details or user ID
        user_id = token.get("user_id")  # Extract user ID from the token data (or adjust as needed)
        
        # Retrieve the profile using the `user_id`
        profile = get_user_profile(user_id)  # Placeholder function, implement your logic

        return profile
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch profile: {str(e)}"
        )


@router.get("/activity-logs", response_model=ActivityLogResponse)
def get_activity_logs(token: str = Depends(authenticate_user)):
    """
    This route is protected and will only return the activity logs
    if the user is authenticated with a valid token.
    """
    try:
        # Token has been validated, proceed to fetch the activity logs
        user_id = token.get("user_id")  # Adjust to match your token data
        activity_logs = get_activity_logs_by_user(user_id)  # Placeholder function

        return activity_logs
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not fetch activity logs: {str(e)}"
        )

