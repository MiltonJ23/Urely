from django.http import JsonResponse
from requests import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from .models import WaterIntake, PhysicalActivity
from .serializers import WaterIntakeSerializer, PhysicalActivitySerializer

class WaterIntakeListCreateView(generics.ListCreateAPIView):
    serializer_class = WaterIntakeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WaterIntake.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PhysicalActivityListCreateView(generics.ListCreateAPIView):
    serializer_class = PhysicalActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PhysicalActivity.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WeeklySummaryView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        water_summary = WaterIntake.objects.filter(user=user).aggregate(total_water=Sum('amount_ml'))
        activity_summary = PhysicalActivity.objects.filter(user=user).aggregate(total_activity=Sum('duration_minutes'))
        return JsonResponse({
            "water_summary": water_summary['total_water'] or 0,
            "activity_summary": activity_summary['total_activity'] or 0,
        })
