from django.contrib import admin
from .models import Language, Appointment, VoiceLog, Translation


# I've registered these models here (admin site) to manage them easily via the admin panel. Hope it make sense. 

admin.site.register(Language)
admin.site.register(Appointment)
admin.site.register(VoiceLog)
admin.site.register(Translation)

