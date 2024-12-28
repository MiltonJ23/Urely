from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your tests here.
class AuthTests(APITestCase):
    def setUp(self):
        """Setup test data."""
        self.register_url = 'register/'
        self.login_url = 'login/'
        self.logout_url = 'logout/'

        self.user_data = {
            "email": "testuser@example.com",
            "password": "securepassword",
            "first_name": "Test",
            "last_name": "User"
        }

        # Create a user for login tests
        self.user = User.objects.create_user(
            email=self.user_data["email"],
            password=self.user_data["password"],
            first_name=self.user_data["first_name"],
            last_name=self.user_data["last_name"]
        )

    def test_register_user(self):
        """Test user registration."""
        response = self.client.post(self.register_url, data=self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("email", response.data)
        self.assertEqual(response.data["email"], self.user_data["email"])

    def test_login_user(self):
        """Test user login and token generation."""
        response = self.client.post(self.login_url, data={
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_logout_user(self):
        """Test user logout by blacklisting the refresh token."""
        # First, log in to get the refresh token
        login_response = self.client.post(self.login_url, data={
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        })
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        refresh_token = login_response.data["refresh"]

        # Use the refresh token to logout
        logout_response = self.client.post(self.logout_url, data={
            "refresh": refresh_token
        })
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        self.assertEqual(logout_response.data["message"], "Logged out successfully")

    def test_invalid_logout(self):
        """Test logout with an invalid refresh token."""
        invalid_refresh_token = "invalid_token"
        response = self.client.post(self.logout_url, data={
            "refresh": invalid_refresh_token
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)


