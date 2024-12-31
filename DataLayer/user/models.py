from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    preferred_language = models.CharField(max_length=50, default='English')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# HealthLogs Model
class HealthLogs(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.activity_type}"

#Clinics model
class Clinic(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    opening_hours = models.CharField(max_length=100)
    closing_hours = models.CharField(max_length=100)

# Appointments Model
class Appointments(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.name} - {self.clinic.name} on {self.date}"



class Profile(models.Model):
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    address = models.TextField()


class HealthLog(models.Model):
    patient = models.ForeignKey(Profile, null=True,on_delete=models.SET_NULL)


class Appointment(models.Model):
    patient = models.ForeignKey(Profile, null=True,on_delete=models.SET_NULL)
    clinic = models.ForeignKey(Clinic, null=True,on_delete=models.SET_NULL)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=[
            ("Scheduled", "Scheduled"),
            ("Completed", "Completed"),
            ("Cancelled", "Cancelled"),
        ],
        default="Scheduled",
    )
