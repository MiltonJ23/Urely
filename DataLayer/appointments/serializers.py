from rest_framework import serializers
from .models import Appointment, Doctor

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        
    def validate(self, data):
        # Example: Ensure required fields are present
        if not data.get("full_name"):
            raise serializers.ValidationError({"full_name": "This field is required."})
        return data

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'