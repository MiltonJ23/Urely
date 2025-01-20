from django.urls import path
from user import views
from .views import DeleteAccountView, ProfileView, UpdateProfileView, UpdateSettingsView, UserRegistrationView, UserDetailView, LogoutView, VerifyTokenView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('profiles/', ProfileView.as_view(), name='profile'),
    # path('clinics/', ClinicView.as_view(), name='clinic'),
    # path('health/', views.health_list),
    # path('appointment/', views.appointment_list),
    # path('profile/<int:id>/', views.profile_detail),
    # path('clinic/<int:id>/', views.clinic_detail),
    # path('health/<int:id>/', views.health_detail),
    # path('appointment/<int:id>/', views.appointment_detail),

    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='user-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain'),

    path('profile/update/', UpdateProfileView.as_view(), name='update-profile'),
    path('profile/delete/', DeleteAccountView.as_view(), name='delete-account'),
    path('settings/', UpdateSettingsView.as_view(), name='update-settings'),
    
    path('forgot-password/', views.forgot_password, name='forgot-password'),

    path('get-user/', views.get_user_details, name='get-user'),

    path('token/verify/', VerifyTokenView.as_view(), name='verify-token'),
]