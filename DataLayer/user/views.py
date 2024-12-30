from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import Profile,Clinic,HealthLog,Appointment
from user.serializer import ProfileSerializer,ClinicSerializer,HealthSerializer,AppointmentSerializer

class ProfileList(APIView):
        def get(request):
            profile = Profile.objects.all()
            serializer = ProfileSerializer(profile, many=True)
            return Response(serializer.data, safe=False)

        def post(request):
            serializer = ProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ClinicList(APIView):        
        def get(request):
            snippets = Clinic.objects.all()
            serializer = ClinicSerializer(snippets, many=True)
            return Response(serializer.data, safe=False)

        def post(request):
            serializer = ClinicSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class HealthList(APIView):        
        def get(request):
            health = HealthLog.objects.all()
            serializer = HealthSerializer(health, many=True)
            return Response(serializer.data, safe=False)

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