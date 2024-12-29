from rest_framework import serializers
from user.models import Profile,Clinic,HealthLog,Appointment

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'date_of_birth', 'email', 'phone_number', 'address']

class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = ['id', 'name', 'address', 'phone_number', 'email', 'opening_hours', 'closing_hours']

class HealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthLog
        fields = ['id', 'patient']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'clinic', 'date', 'time', 'reason', 'status']