from .models import UserAccount
from rest_framework import serializers
from rest_framework.fields import CharField, EmailField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'preferred_language']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserAccount
        fields = ['email', 'password', 'first_name', 'last_name', 'preferred_language']

    def create(self, validated_data):
        user = UserAccount.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            preferred_language=validated_data.get('preferred_language', 'English'),
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['first_name', 'last_name', 'email', 'preferred_language']
        read_only_fields = ['email']