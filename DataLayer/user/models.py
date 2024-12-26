from django.db import models

# User Model
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    preferred_language = models.CharField(max_length=50)

    def __str__(self):
        return self.name

# HealthLogs Model
class HealthLogs(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.activity_type}"

# Clinics Model
class Clinics(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# Appointments Model
class Appointments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinics, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.name} - {self.clinic.name} on {self.date}"


class User(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField()
