from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Appointment, Doctor
from .serializers import AppointmentSerializer

# Create an appointment
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def create_appointment(request):
    """
    Create an appointment for an authenticated user.
    """
    doctor_id = request.data.get('doctor_id')
    appointment_date = request.data.get('date')

    # Validate inputs
    if not doctor_id or not appointment_date:
        return Response({"error": "Doctor ID and date are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Fetch the doctor or return a 404 error
    doctor = get_object_or_404(Doctor, id=doctor_id)

    # Create and save the appointment
    appointment = Appointment(user=request.user, doctor=doctor, date=appointment_date)
    appointment.save()

    return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)


# View all appointments for the authenticated user
@api_view(["GET"])
@permission_classes([IsAuthenticated])  # Allow any user to view appointments
def appointments_list(request):
    user = request.user
    appointments = Appointment.objects.filter(user=user)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


# Cancel an appointment
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def cancel_appointment(request, appointment_id):
    """
    Cancel a specific appointment for the authenticated user.
    """
    # Fetch the appointment or return a 404 error
    appointment = get_object_or_404(Appointment, id=appointment_id, user=request.user)

    # Update the appointment status to "Cancelled"
    appointment.status = "Cancelled"
    appointment.save()

    return Response(AppointmentSerializer(appointment).data, status=status.HTTP_200_OK)


# Get appointment details
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def get_appointment_details(request, appointment_id):
    """
    Retrieve the details of a specific appointment by its ID.
    """
    # Fetch the appointment or return a 404 error
    appointment = get_object_or_404(Appointment, id=appointment_id, user=request.user)

    # Construct the appointment details response
    appointment_details = {
        "id": appointment.id,
        "user_email": appointment.user.email,  # Assuming the user model has an email field
        "doctor_name": appointment.doctor.name,
        "doctor_specialty": appointment.doctor.specialty,
        "doctor_phone_number": appointment.doctor.phone_number,
        "date": appointment.date.strftime("%Y-%m-%d %H:%M:%S"),
        "status": appointment.get_status_display(),  # Converts 'Cancelled' to 'Cancelled'
    }

    return Response(appointment_details, status=status.HTTP_200_OK)
