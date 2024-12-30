from django.urls import path
from user import views
from .views import ProfileView, UserRegistrationView, UserDetailView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('profiles/', views.profile_list),
    # path('clinics/', views.clinic_list),
    # path('profile/<int:id>/', views.profile_detail),

    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='user-detail'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profiles/', views.ProfileList.as_view()),
    path('clinics/', views.ClinicList.as_view()),
    path('health/', views.HealthList.as_view()),
    path('appointment/', views.AppointmentList.as_view()),
    path('profile/<int:id>/', views.ProfileDetail.as_view()),
    path('clinic/<int:id>/', views.ClinicDetail.as_view()),
    path('health/<int:id>/', views.HealthDetail.as_view()),
]
