from django.db import models
from django.contrib.auth.models import User

# Ok for explanation of the code i no go talk to much 😂🙌🏾.


# This is the model of the Language as you asked Mr the Group Coordinator 👀

class Language(models.Model):
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# This is the model of Appointments 🫵🏼


class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    clinic_name = models.CharField(max_length=255)
    appointment_date = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Appointment for {self.user.username} at {self.clinic_name} on {self.appointment_date}"
    

#This is the model of Voice Commands 🗣🎤


class VoiceLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='voice_logs')
    command = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Voice command by {self.user.username} at {self.timestamp}"
    

# This is the model of Translations 🌍

class Translation(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='translations')
    key = models.CharField(max_length=255)
    value = models.TextField()

    def __str__(self):
        return f"Translation for {self.language.name}: {self.key} -> {self.value}"
    

    # For the clear explanation of the code kindly read the Readme file in the repository. Thank you  🙏🏽🫂



# GROUP COORDINATOR SO YOU WANT KILL ME WITH WORK ON A 29 OF DECEMBER 😭

        