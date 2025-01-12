from django.urls import path
from .views import WaterIntakeListCreateView, PhysicalActivityListCreateView, WeeklySummaryView

urlpatterns = [
    path('water-intake/', WaterIntakeListCreateView.as_view(), name='water-intake'),
    path('physical-activity/', PhysicalActivityListCreateView.as_view(), name='physical-activity'),
    path('weekly-summary/', WeeklySummaryView.as_view(), name='weekly-summary'),
]
