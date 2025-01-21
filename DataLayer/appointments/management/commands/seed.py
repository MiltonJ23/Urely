from django.core.management.base import BaseCommand
from appointments.models import Doctor, WorkingHour  # Replace 'myapp' with the correct app name
from datetime import datetime, time

class Command(BaseCommand):
    help = 'Seed the database with doctor and working hour data'

    def handle(self, *args, **kwargs):
        # List of doctor data to be seeded
        doctor_data = [
            {"name": "Dr. Adewale Okeke", "phone_number": "+2347012345678", "email": "adewale.okeke@example.com", "workinghour": "Mon-Fri: 8 AM - 4 PM", "specialty": "General Practitioner", "location": "Lagos, Nigeria"},
            {"name": "Dr. Aissatou Diallo", "phone_number": "+221771234567", "email": "aissatou.diallo@example.com", "workinghour": "Tue-Sat: 9 AM - 5 PM", "specialty": "Pediatrician", "location": "Dakar, Senegal"},
            {"name": "Dr. Josephine Mensah", "phone_number": "+233204567891", "email": "josephine.mensah@example.com", "workinghour": "Mon-Fri: 7 AM - 3 PM", "specialty": "Cardiologist", "location": "Accra, Ghana"},
            {"name": "Dr. Ahmed Hassan", "phone_number": "+201234567890", "email": "ahmed.hassan@example.com", "workinghour": "Sun-Thu: 9 AM - 5 PM", "specialty": "Orthopedic Surgeon", "location": "Cairo, Egypt"},
            {"name": "Dr. Pierre N'Dri", "phone_number": "+2250123456789", "email": "pierre.ndri@example.com", "workinghour": "Mon-Fri: 8 AM - 4 PM", "specialty": "General Practitioner", "location": "Abidjan, Ivory Coast"},
            {"name": "Dr. Fatima Omar", "phone_number": "+212612345678", "email": "fatima.omar@example.com", "workinghour": "Mon-Sat: 10 AM - 6 PM", "specialty": "Neurologist", "location": "Rabat, Morocco"},
            {"name": "Dr. Leila Mbatha", "phone_number": "+254712345678", "email": "leila.mbatha@example.com", "workinghour": "Tue-Sat: 11 AM - 7 PM", "specialty": "Gynecologist", "location": "Nairobi, Kenya"},
            {"name": "Dr. Samuel Chukwuma", "phone_number": "+2348034567890", "email": "samuel.chukwuma@example.com", "workinghour": "Mon-Fri: 8 AM - 4 PM", "specialty": "Dermatologist", "location": "Enugu, Nigeria"},
            {"name": "Dr. Mariam Sow", "phone_number": "+223701234567", "email": "mariam.sow@example.com", "workinghour": "Wed-Sun: 9 AM - 3 PM", "specialty": "Pediatrician", "location": "Bamako, Mali"},
            {"name": "Dr. Zanele Khumalo", "phone_number": "+27 82 123 4567", "email": "zanele.khumalo@example.com", "workinghour": "Mon-Thu: 9 AM - 5 PM", "specialty": "Psychiatrist", "location": "Johannesburg, South Africa"},
            {"name": "Dr. Salif Traoré", "phone_number": "+226701234567", "email": "salif.traore@example.com", "workinghour": "Mon-Fri: 8 AM - 4 PM", "specialty": "Oncologist", "location": "Ouagadougou, Burkina Faso"},
            {"name": "Dr. Nyasha Chipo", "phone_number": "+263712345678", "email": "nyasha.chipo@example.com", "workinghour": "Mon-Fri: 10 AM - 6 PM", "specialty": "Endocrinologist", "location": "Harare, Zimbabwe"},
            {"name": "Dr. Kagiso Mpho", "phone_number": "+26771234567", "email": "kagiso.mpho@example.com", "workinghour": "Mon-Fri: 10 AM - 6 PM", "specialty": "Dermatologist", "location": "Gaborone, Botswana"},
        ]

        # Iterate over the doctor data and create Doctor and WorkingHour records
        for data in doctor_data:
            doctor, created = Doctor.objects.get_or_create(
                name=data["name"],
                phone_number=data["phone_number"],
                email=data["email"],
                specialty=data["specialty"],
                location=data["location"]
            )
            
            # Split the working hours into days and times
            working_hours = data["workinghour"].split(":")
            days = working_hours[0].split("-")
            time_range = working_hours[1].strip()

            start_time_str, end_time_str = time_range.split(" - ")
            
            # Use datetime.strptime() to parse the time strings
            start_time_obj = datetime.strptime(start_time_str, "%I %p").time()
            end_time_obj = datetime.strptime(end_time_str, "%I %p").time()

            # Create WorkingHour entries based on the days
            for day in days:
                # Day of week mapping
                day_map = {
                    "Mon": 0,
                    "Tue": 1,
                    "Wed": 2,
                    "Thu": 3,
                    "Fri": 4,
                    "Sat": 5,
                    "Sun": 6,
                }
                if day in day_map:
                    WorkingHour.objects.get_or_create(
                        doctor=doctor,
                        day_of_week=day_map[day],
                        start_time=start_time_obj,
                        end_time=end_time_obj
                    )

        self.stdout.write(self.style.SUCCESS("Doctors and Working Hours seeded successfully!"))
