from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Appointment, Patient


@receiver(post_save, sender=Appointment)
def update_patient_count(sender, instance, **kwargs):
    """
    Increment the doctor's patient count when an appointment is marked as completed.
    """
    if instance.status == "completed":
        doctor = instance.doctor

        # Increment patients_count only if it's a new completion
        if not hasattr(instance, '_already_counted') or not instance._already_counted:
            doctor.patients_count += 1
            doctor.save()
            instance._already_counted = True

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_patient_for_new_user(sender, instance, created, **kwargs):
    """
    Create a Patient when a new User is created.
    """
    if created:
        # Create a Patient record when a new User is created
        Patient.objects.create(user=instance)