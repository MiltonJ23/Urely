# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment, Doctor
from .serializers import AppointmentSerializer

# Create an appointment
@api_view(['POST'])
def create_appointment(request):
    if request.method == 'POST':
        doctor_id = request.data['doctor_id']
        appointment_date = request.data['date']
        user = request.user  # Assuming user is authenticated
        
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)
        
        appointment = Appointment(user=user, doctor=doctor, date=appointment_date)
        appointment.save()
        return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)

# View all appointments for the user
@api_view(['GET'])
def view_appointments(request):
    user = request.user
    appointments = Appointment.objects.filter(user=user)
    return Response(AppointmentSerializer(appointments, many=True).data)

# Cancel an appointment
@api_view(['POST'])
def cancel_appointment(request, appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id, user=request.user)
    except Appointment.DoesNotExist:
        return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
    
    appointment.status = "Cancelled"
    appointment.save()
    return Response(AppointmentSerializer(appointment).data)
