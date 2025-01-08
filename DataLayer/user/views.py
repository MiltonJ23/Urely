from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from user.models import Profile,Clinic,HealthLog,Appointment

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token

            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token or token already blacklisted"}, status=status.HTTP_400_BAD_REQUEST)
        
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Retrieve user profile."""
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """Update user profile."""
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyTokenView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Verify the token and return user details.
        """
        user = request.user
        return Response({
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "preferred_language": user.preferred_language,
        })


@csrf_exempt
def profile_list(request):
    if request.method == 'GET':
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def clinic_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        snippets = Clinic.objects.all()
        serializer = ClinicSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ClinicSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def health_list(request):
    if request.method == 'GET':
        health = HealthLog.objects.all()
        serializer = HealthSerializer(health, many=True)
        return JsonResponse(serializer.data, safe=False)

        def post(request):
            serializer = HealthSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        
class AppointmentList(APIView):        
        def get(request):
            snippets = Appointment.objects.all()
            serializer = AppointmentSerializer(snippets, many=True)
            return Response(serializer.data, safe=False)

        def post(request):
            serializer = AppointmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        
class ProfileDetail(APIView):

    def get_object(self, id):
        try:
            return Profile.objects.get(id=id)
        except Profile.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        profile = self.get_object(id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, id):
        profile = self.get_object(id) 
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        profile = self.get_object(id)
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ClinicDetail(APIView):
    def get_object(self, id):
        try:
            return Clinic.objects.get(id=id)
        except Clinic.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        clinic = self.get_object(id)
        serializer = ClinicSerializer(clinic)
        return Response(serializer.data)

    def put(self, request, id):
        clinic = self.get_object(id) 
        serializer = ClinicSerializer(clinic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        clinic = self.get_object(id)
        clinic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class HealthDetail(APIView):
    def get_object(self, id):
        try:
            return HealthLog.objects.get(id=id)
        except HealthLog.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        health = self.get_object(id)
        serializer = HealthSerializer(health)
        return Response(serializer.data)

    def put(self, request, id):
        health = self.get_object(id)
        serializer = HealthSerializer(health, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        health = self.get_object(id)
        health.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class AppointmentDetail(APIView):
    def get_object(self, id):
        try:
            return Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            raise Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        appointment = self.get_object(id)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    def put(self, request, id):
        appointment = self.get_object(id)
        serializer = AppointmentSerializer(appointment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, id):
        appointment = self.get_object(id)
        appointment.delete()
        return Response(status=204)