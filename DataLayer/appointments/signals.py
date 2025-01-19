from django.dispatch import receiver
from django.db.models.signals import post_save

from .models import Appointment


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