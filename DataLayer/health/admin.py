from django.contrib import admin

from .models import ActivityLog, PhysicalActivity, WaterIntake

# Register your models here.
admin.site.register(ActivityLog)
admin.site.register(WaterIntake)
admin.site.register(PhysicalActivity)