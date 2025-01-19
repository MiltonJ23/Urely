from django.urls import path
from . import views

urlpatterns = [
    path('', views.appointments_list, name='index'),
    path('recent/', views.RecentAppointmentsView.as_view(), name='recent-appointments'),
    path('<int:appointment_id>/', views.get_appointment_details, name='appointment-detail'),
    path('create/', views.create_appointment, name='appointment-create'),
    path('update/<int:appointment_id>/', views.CompleteAppointmentView.as_view(), name='appointment-update'),
    # path('update/<int:appointment_id>/', views, name='appointment-update'),
    path('delete/<int:appointment_id>/', views.cancel_appointment, name='appointment-delete'),
    path('doctors/<int:doctor_id>/', views.get_doctor, name='doctor-list'),
    path('doctors/', views.get_doctors, name='doctors-list'),
    path('statistics/', views.StatisticsView.as_view(), name='appointment-statistics'),
]