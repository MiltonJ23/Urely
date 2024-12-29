from django.urls import path
from user import views
from .views import ProfileView, UserRegistrationView, UserDetailView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('profiles/', views.profile_list),
    path('clinics/', views.clinic_list),
    path('health/', views.health_list),
    path('appointment/', views.appointment_list),
    path('profile/<int:id>/', views.profile_detail),
    path('clinic/<int:id>/', views.clinic_detail),
    path('health/<int:id>/', views.health_detail),
    path('appointment/<int:id>/', views.appointment_detail),

    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserDetailView.as_view(), name='user-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]