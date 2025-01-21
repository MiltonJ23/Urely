from datetime import date
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Appointment, Doctor, Patient
from .serializers import AppointmentSerializer, DoctorSerializer
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, UpdateAPIView
from dateutil.parser import parse

# Create an appointment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    data = request.data

    # Validate required fields
    required_fields = [
        "fullName", "gender", "phone", "age", 
        "appointmentDate", "referredByDoctor", "assignedDoctor"
    ]
    for field in required_fields:
        if field not in data or not data[field]:
            return Response({"error": f"{field} is required."}, status=status.HTTP_400_BAD_REQUEST)

    # Parse the appointment date
    try:
        appointment_date = parse(data["appointmentDate"]).date()
    except ValueError:
        return Response(
            {"error": "Invalid appointmentDate format. Use YYYY-MM-DD."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create the appointment object
    appointment = Appointment.objects.create(
        full_name=data["fullName"],
        gender=data["gender"],
        phone=data["phone"],
        age=int(data["age"]),
        appointment_date=appointment_date,
        referred_by_doctor=data["referredByDoctor"],
        assigned_doctor=data["assignedDoctor"],
        user=request.user,
    )

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


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
    


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter appointments based on the authenticated patient
        patient = Patient.objects.get(user=self.request.user)
        return Appointment.objects.filter(patient=patient)

    def perform_create(self, serializer):
        patient = Patient.objects.get(user=self.request.user)  # Get patient from authenticated user
        serializer.save(patient=patient)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        # Update the status of an appointment (e.g., from "Scheduled" to "Completed")
        appointment = self.get_object()
        status = request.data.get('status')
        if status:
            appointment.status = status
            appointment.save()
            return Response({"status": "Appointment status updated"})
        return Response({"detail": "Status not provided"}, status=400)

    @action(detail=False, methods=["get"])
    def today(self, request):
        # Retrieve today's appointments for the authenticated user (patient)
        patient = Patient.objects.get(user=request.user)
        today_appointments = Appointment.objects.filter(patient=patient, appointment_date__date=date.today())
        if not today_appointments:
            return Response({"detail": "No appointments today"}, status=404)
        serializer = AppointmentSerializer(today_appointments, many=True)
        return Response(serializer.data)
    


class AppointmentCreateView(CreateAPIView):
    """
    View to create a new appointment for the authenticated user.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AppointmentUpdateView(UpdateAPIView):
    """
    View to update an existing appointment.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)


class AppointmentDeleteView(DestroyAPIView):
    """
    View to delete an appointment.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
    

class MarkCheckedInView(APIView):
    """
    Custom view to mark an appointment as checked-in.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        appointment = get_object_or_404(Appointment, pk=pk, user=request.user)
        # Add your custom logic here (e.g., updating a status field)
        appointment.checked_in = True  # Assuming a field 'checked_in'
        appointment.save()
        return Response({"message": "Appointment marked as checked-in"}, status=status.HTTP_200_OK)
    


@api_view(['GET'])
@permission_classes([AllowAny])
def get_doctor_by_id(request, doctor_id):
    """
    Get doctor details by ID.
    """
    try:
        # Fetch the doctor by ID
        doctor = Doctor.objects.get(id=doctor_id)
    except Doctor.DoesNotExist:
        # If doctor does not exist, return a 404 response
        return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

    # Serialize the doctor data and return it
    serializer = DoctorSerializer(doctor)
    return Response(serializer.data)