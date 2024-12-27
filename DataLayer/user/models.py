from django.db import models

# Modèle User (Utilisateur)
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# Modèle HealthLog (Journal de santé)
class HealthLog(models.Model):
    ACTIVITY_TYPES = [
        ('water', 'Water Intake'),
        ('exercise', 'Exercise'),
        ('sleep', 'Sleep Duration'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_logs')
    activity_type = models.CharField(max_length=50, choices=ACTIVITY_TYPES)
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.activity_type} ({self.value}) at {self.timestamp}"


# Modèle Clinic (Clinique)
class Clinic(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return self.name
