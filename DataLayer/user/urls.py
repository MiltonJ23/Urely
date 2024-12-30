from django.urls import path
from user import views

urlpatterns = [
    path('profiles/', views.ProfileList.as_view()),
    path('clinics/', views.ClinicList.as_view()),
    path('health/', views.HealthList.as_view()),
    path('appointment/', views.AppointmentList.as_view()),
    path('profile/<int:id>/', views.ProfileDetail.as_view()),
    path('clinic/<int:id>/', views.ClinicDetail.as_view()),
    path('health/<int:id>/', views.HealthDetail.as_view()),
    path('appointment/<int:id>/', views.AppointmentDetail.as_view()),
]