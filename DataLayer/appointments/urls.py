from django.urls import path
from . import views

urlpatterns = [
    path('', views.appointments_list, name='index'),
    path('<int:appointment_id>/', views.get_appointment_details, name='appointment-detail'),
    path('create/', views.create_appointment, name='appointment-create'),
    # path('update/<int:appointment_id>/', views, name='appointment-update'),
    path('delete/<int:appointment_id>/', views.cancel_appointment, name='appointment-delete'),
]