from django.core.management.base import BaseCommand
from myapp.models import User, Clinic, HealthLog  # Make sure 'myapp' is the correct app name
from random import randint

class Command(BaseCommand):
    help = 'Seed the database with sample data'

    def handle(self, *args, **kwargs):
        # Seed Users
        users = [
            {"name": "Alice", "email": "alice@example.com"},
            {"name": "Bob", "email": "bob@example.com"},
            {"name": "Charlie", "email": "charlie@example.com"},
        ]
        for user_data in users:
            User.objects.get_or_create(**user_data)

        # Seed Clinics
        clinics = [
            {"name": "Health Center A", "location": "Downtown"},
            {"name": "Clinic B", "location": "Uptown"},
        ]
        for clinic_data in clinics:
            Clinic.objects.get_or_create(**clinic_data)

        # Seed Health Logs
        all_users = User.objects.all()
        for user in all_users:
            for _ in range(5):  # Create 5 logs per user
                HealthLog.objects.create(
                    user=user,
                    steps=randint(1000, 10000),
                    water_intake=randint(1, 3) + randint(0, 9) / 10,
                )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
