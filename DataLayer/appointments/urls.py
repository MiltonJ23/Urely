from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:appointment_id>/', views.detail, name='appointment-detail'),
    path('create/', views.create, name='appointment-create'),
    path('update/<int:appointment_id>/', views.update, name='appointment-update'),
    path('delete/<int:appointment_id>/', views.delete, name='appointment-delete'),
]