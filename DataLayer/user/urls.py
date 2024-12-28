from django.urls import path
from user import views

urlpatterns = [
    path('profiles/', views.profile_list),
    path('clinics/', views.clinic_list),
    path('health/', views.health_list),
    path('appointment/', views.appointment_list),
    path('profile/<int:id>/', views.profile_detail),
    path('clinic/<int:id>/', views.clinic_detail),
    path('health/<int:id>/', views.health_detail),
    path('appointment/<int:id>/', views.appointment_detail),

]