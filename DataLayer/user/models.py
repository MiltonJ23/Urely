from django.db import models

class Clinic(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    opening_hours = models.CharField(max_length=100)
    closing_hours = models.CharField(max_length=100)


class Profile(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()


class HealthLog(models.Model):
    id = models.IntegerField(primary_key=True)
    patient = models.ForeignKey(Profile, null=True,on_delete=models.SET_NULL)


class Appointment(models.Model):
    id = models.IntegerField(primary_key=True)
    patient = models.ForeignKey(Profile, null=True,on_delete=models.SET_NULL)
    clinic = models.ForeignKey(Clinic, null=True,on_delete=models.SET_NULL)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=[
            ("Scheduled", "Scheduled"),
            ("Completed", "Completed"),
            ("Cancelled", "Cancelled"),
        ],
        default="Scheduled",
    )
