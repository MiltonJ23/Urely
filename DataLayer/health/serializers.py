from rest_framework import serializers
from .models import WaterIntake, PhysicalActivity, ActivityLog
from rest_framework import viewsets

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


class ActivityLogSerializer(serializers.ModelSerializer):
    is_water_intake_met = serializers.ReadOnlyField()
    is_exercise_met = serializers.ReadOnlyField()
    is_medication_met = serializers.ReadOnlyField()
    is_food_intake_met = serializers.ReadOnlyField()
    is_steps_met = serializers.ReadOnlyField()
    is_calories_met = serializers.ReadOnlyField()

    class Meta:
        model = ActivityLog
        fields = [
            "id",
            "user",
            "date",
            "water_intake",
            "exercise_duration",
            "medication_count",
            "food_intake",
            "is_water_intake_met",
            "is_exercise_met",
            "is_medication_met",
            "is_food_intake_met",
            "is_steps_met",
            "is_calories_met",
        ]
        read_only_fields = ["id", "is_water_intake_met", "is_exercise_met", "is_medication_met", "is_food_intake_met", 'is_steps_met', 'is_calories_met']