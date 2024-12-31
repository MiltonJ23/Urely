from django.db import models
from django.conf import settings

class WaterIntake(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    amount_ml = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.date} - {self.amount_ml}ml"

class PhysicalActivity(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.email} - {self.activity_type} - {self.duration_minutes}min"
