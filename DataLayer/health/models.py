from django.db import models
from django.conf import settings
from datetime import date

class WaterIntake(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    amount_ml = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.date} - {self.amount_ml}ml"

class PhysicalActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.activity_type} - {self.duration_minutes}min"


class ActivityLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    water_intake = models.PositiveIntegerField(default=0)
    exercise_duration = models.PositiveIntegerField(default=0)
    steps_count = models.PositiveIntegerField(default=0)
    calories_burned = models.PositiveIntegerField(default=0)
    medication_count = models.PositiveIntegerField(default=0)
    food_intake = models.PositiveIntegerField(default=0)

    @property
    def is_water_intake_met(self):
        return self.water_intake >= 2000  # 2L target

    @property
    def is_exercise_met(self):
        return self.exercise_duration >= 60  # 60 min target

    @property
    def is_medication_met(self):
        return self.medication_count >= 1  # 1 pill target

    @property
    def is_food_intake_met(self):
        return self.food_intake <= 2000  # 2000 kcal target

    def __str__(self):
        return f"Activity Log for {self.user.username} on {self.date}"


class HealthTip(models.Model):
    tip = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tip

    @classmethod
    def create_health_tips(cls):
        tips = [
            "Drink at least 2 liters of water daily.",
            "Exercise for at least 60 minutes every day.",
            "Take your medication as prescribed.",
            "Maintain a balanced diet with a maximum of 2000 kcal per day.",
            "Get at least 8 hours of sleep every night.",
            "Avoid sugary drinks and snacks.",
            "Incorporate fruits and vegetables into every meal.",
            "Take breaks and stretch during long periods of sitting.",
            "Practice mindfulness or meditation to reduce stress.",
            "Limit screen time before bed to improve sleep quality"
        ]
        for tip in tips:
            cls.objects.create(tip=tip)
