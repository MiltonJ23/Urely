from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from datetime import timedelta, date
from user.models import UserAccount  # Replace 'your_app' with the actual app name where UserAccount is defined


# Patient model
class Patient(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"



class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    description = models.CharField(max_length=500)
    experience = models.IntegerField(default=0)
    patients_count = models.PositiveBigIntegerField(default=0)
    image = models.ImageField(upload_to='doctors/', default='doctors/default.png')
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def get_available_times(self, date):
        """
        Get the available time slots for a specific doctor on a given date.
        """
        working_hours = self.workinghour_set.filter(day_of_week=date.weekday())
        appointments = self.appointment_set.filter(date__date=date).values_list("date", flat=True)

        available_slots = []
        for hours in working_hours:
            start_time = hours.start_time
            while start_time + timedelta(minutes=hours.slot_duration) <= hours.end_time:
                if not any(appointment.time() == start_time for appointment in appointments):
                    available_slots.append(start_time)
                start_time += timedelta(minutes=hours.slot_duration)
        return available_slots


class WorkingHour(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    day_of_week = models.IntegerField(
        choices=[
            (0, 'Monday'),
            (1, 'Tuesday'),
            (2, 'Wednesday'),
            (3, 'Thursday'),
            (4, 'Friday'),
            (5, 'Saturday'),
            (6, 'Sunday'),
        ]
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
    slot_duration = models.IntegerField(default=30)  # Duration of each slot in minutes

    def __str__(self):
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return f"{self.doctor.name} - {days[self.day_of_week]}: {self.start_time} to {self.end_time}"


class Appointment(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]

    full_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15, default='')  # To handle various phone formats
    age = models.PositiveIntegerField(default=0)
    appointment_date = models.DateField(default=date.today)
    referred_by_doctor = models.CharField(max_length=255, blank=True, null=True)
    assigned_doctor = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="appointments",
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Pending'
    )

    def __str__(self):
        return f"{self.full_name} - {self.appointment_date}"
    

