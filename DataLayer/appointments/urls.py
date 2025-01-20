from django.db import router
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', views.appointments_list, name='index'),
    path('recent/', views.RecentAppointmentsView.as_view(), name='recent-appointments'),
    path('api/', include(router.urls)),
    path('update/<int:appointment_id>/', views.CompleteAppointmentView.as_view(), name='appointment-update'),
    # path('update/<int:appointment_id>/', views, name='appointment-update'),
    path('delete/<int:appointment_id>/', views.cancel_appointment, name='appointment-delete'),
    path('doctors/<int:doctor_id>/', views.get_doctor, name='doctor-list'),
    path('doctors/', views.get_doctors, name='doctors-list'),
    path('statistics/', views.StatisticsView.as_view(), name='appointment-statistics'),
]