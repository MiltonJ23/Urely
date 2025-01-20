from django.contrib import admin

from .models import ActivityLog, HealthTip, PhysicalActivity, WaterIntake

# Register your models here.
admin.site.register(ActivityLog)
admin.site.register(WaterIntake)
admin.site.register(PhysicalActivity)
admin.site.register(HealthTip)