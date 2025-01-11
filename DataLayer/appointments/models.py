from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
from datetime import timedelta


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

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
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status_choices = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=10, choices=status_choices, default='pending')

    def __str__(self):
        return f"Appointment with {self.doctor.name} on {self.date}"
