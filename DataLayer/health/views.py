from datetime import date
from django.http import JsonResponse
from requests import Response
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action
from django.db.models import Sum
from .models import WaterIntake, PhysicalActivity, ActivityLog
from .serializers import ActivityLogSerializer, WaterIntakeSerializer, PhysicalActivitySerializer

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
    

class ActivityLogViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Activity Logs.
    """
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter logs to only those belonging to the authenticated user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user to the authenticated user
        serializer.save(user=self.request.user)

    @action(detail=False, methods=["get"])
    def today(self, request):
        """
        Retrieve today's activity log for the authenticated user.
        """
        log = self.get_queryset().filter(date=date.today()).first()
        if not log:
            return Response({"detail": "No activity log for today"}, status=404)
        serializer = self.get_serializer(log)
        return Response(serializer.data)