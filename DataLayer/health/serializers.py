from rest_framework import serializers
from .models import WaterIntake, PhysicalActivity

class WaterIntakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterIntake
        fields = ['id', 'date', 'amount_ml']

    def validate_amount_ml(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

class PhysicalActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PhysicalActivity
        fields = ['id', 'date', 'activity_type', 'duration_minutes']

    def validate_duration_minutes(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than zero.")
        return value
