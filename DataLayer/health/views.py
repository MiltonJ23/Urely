from datetime import date
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.db.models import Sum
from .models import WaterIntake, PhysicalActivity, ActivityLog, HealthTip
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
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Filter logs to only those belonging to the authenticated user.
        """
        return ActivityLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Automatically set the user to the authenticated user before saving.
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Automatically update the user to the authenticated user before saving.
        """
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
    

class TodayActivityLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the authenticated user
        user = request.user

        # Query for today's activity logs
        today = date.today()
        activity_logs = ActivityLog.objects.filter(user=user, date=today)

        # Aggregate data
        total_steps = activity_logs.aggregate(Sum('steps_count'))['steps_count__sum'] or 0
        total_calories = activity_logs.aggregate(Sum('calories_burned'))['calories_burned__sum'] or 0

        # Prepare the response data
        data = {
            'steps': total_steps,
            'calories': total_calories,
        }
        return Response(data, status=200)



class DashboardDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Fetch activity log for today (handling case where no data is found)
        today = date.today()
        activity_log = ActivityLog.objects.filter(user=user, date=today)


        # Aggregate steps and calories burned
        total_steps = activity_log.aggregate(Sum('steps_count'))['steps_count__sum'] or 0
        total_calories = activity_log.aggregate(Sum('calories_burned'))['calories_burned__sum'] or 0

        # Fetch a random health tip, or default if none found
        health_tip = HealthTip.objects.all().order_by('?').first()
        health_tip_text = health_tip.tip if health_tip else "Drink more water today!"

        # Fetch user insights from UserAccount, if available
        user_insight = user.insight if user else "Monitor your key health metrics"

        # Card data - Dynamically set values
        card_data = [
            {"title": "Steps Today", "value": total_steps},
            {"title": "Calories Burned", "value": total_calories},
            {"title": "Health Tips", "value": health_tip_text},
            {"title": "Personalized Insights", "value": user_insight},
        ]

        # Chart data - You can replace these with actual chart components or dynamic data
        chart_data = [
            {"name": "Steps", "steps": total_steps, "calories": total_calories},  # Steps data
            {"name": "Calories", "steps": 0, "calories": total_calories},  # Calories data
        ]


        # Corrected: Return response with card and chart data using keyword arguments
        return JsonResponse({
            "cardData": card_data if card_data else [],  # Empty list if no card data found
            "chartData": chart_data if chart_data else []  # Empty list if no chart data found
        })