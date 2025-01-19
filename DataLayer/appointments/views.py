from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Appointment, Doctor
from .serializers import AppointmentSerializer, DoctorSerializer
from rest_framework.views import APIView

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

class CompleteAppointmentView(APIView):
    def post(self, request, appointment_id):
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            appointment.status = "completed"
            appointment.save()  # Triggers the signal
            return Response({"message": "Appointment marked as completed"}, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)


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
        "date": appointment.date.strftime("%Y-%m-%d %H:%M:%S"),  # Make sure date format matches frontend expectation
        "status": appointment.get_status_display(),  # Converts 'Cancelled' to 'Cancelled'
    }

    return Response(appointment_details, status=status.HTTP_200_OK)



# Create a doctor
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def create_doctor(request):
    """
    Create a new doctor in the system.
    """
    name = request.data.get('name')
    specialty = request.data.get('specialty')
    phone_number = request.data.get('phone_number')
    education = request.data.get('education')
    gender = request.data.get('gender')

    # Validate inputs
    if not name or not specialty or not phone_number:
        return Response({"error": "Name, specialty, and phone number are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Create and save the doctor
    doctor = Doctor(name=name, specialty=specialty, phone_number=phone_number, education=education, gender=gender)
    doctor.save()

    return Response(DoctorSerializer(doctor).data, status=status.HTTP_201_CREATED)


# List all doctors
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def list_doctors(request):
    """
    Get a list of all doctors.
    """
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


# Get a specific doctor by ID
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def get_doctor(request, doctor_id):
    """
    Retrieve details of a specific doctor by their ID.
    """
    doctor = get_object_or_404(Doctor, id=doctor_id)
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)


# Update a doctor's details
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def update_doctor(request, doctor_id):
    """
    Update details of an existing doctor.
    """
    doctor = get_object_or_404(Doctor, id=doctor_id)

    # Update doctor details based on request data
    doctor.name = request.data.get('name', doctor.name)
    doctor.specialty = request.data.get('specialty', doctor.specialty)
    doctor.phone_number = request.data.get('phone_number', doctor.phone_number)
    doctor.education = request.data.get('education', doctor.education)
    doctor.gender = request.data.get('gender', doctor.gender)
    doctor.save()

    return Response(DoctorSerializer(doctor).data, status=status.HTTP_200_OK)


# Delete a doctor
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Ensure user is authenticated
def delete_doctor(request, doctor_id):
    """
    Delete a doctor from the system.
    """
    doctor = get_object_or_404(Doctor, id=doctor_id)
    doctor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


class StatisticsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        try:
            upcoming_appointments = Appointment.objects.filter(status='upcoming').count()
            patients_handled = Patient.objects.count()
            operations_performed = Appointment.objects.filter(operation_performed=True).count()
            patients_referred = Patient.objects.filter(referred=True).count()

            statistics_data = {
                "upcomingAppointments": upcoming_appointments,
                "patientsHandled": patients_handled,
                "operationsPerformed": operations_performed,
                "patientsReferred": patients_referred
            }

            return Response(statistics_data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RecentAppointmentsView(APIView):
    def get(self, request):
        # Fetch the 5 most recent appointments
        recent_appointments = Appointment.objects.order_by('-appointment_date')[:7]
        serializer = AppointmentSerializer(recent_appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)