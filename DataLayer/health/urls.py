from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ActivityLogViewSet, WaterIntakeListCreateView, PhysicalActivityListCreateView, WeeklySummaryView, DashboardDataView
router = DefaultRouter()
router.register(r"activity-logs", ActivityLogViewSet, basename="activity-log")

urlpatterns = [
    path('water-intake/', WaterIntakeListCreateView.as_view(), name='water-intake'),
    path('physical-activity/', PhysicalActivityListCreateView.as_view(), name='physical-activity'),
    path('weekly-summary/', WeeklySummaryView.as_view(), name='weekly-summary'),
    path('dashboard/', DashboardDataView.as_view(), name='dashboard'),
    path("", include(router.urls)),
]
