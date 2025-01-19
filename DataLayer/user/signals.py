from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccount, Profile
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=UserAccount, weak=False)
def report_uploaded(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)
        Profile.objects.create(user=instance)
