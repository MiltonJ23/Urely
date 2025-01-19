from django.contrib import admin
from .models import Appointment, WorkingHour, Doctor

# Register your models here.
admin.site.register(Appointment)
# admin.site.register(WorkingHour)
admin.site.register(Doctor)