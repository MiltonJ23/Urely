# Urely


Health and Wellness Companion

Overview

Health and Wellness Companion is a web-based application designed to help users track their health and wellness through Alexa-enabled voice commands. The application provides a dashboard with health insights and integrates with African  doctors via APIs.

Features

Alexa Integration: Log daily activities like water intake, exercise, and medication reminders through voice commands.

Health Dashboard: View personalized health insights and recommendations.

Book appointment with doctors


Technologies Used

Backend: Django, Django Rest Framework

Frontend: React, Material-UI

Cloud: AWS (Elastic Beanstalk, RDS, S3, CloudFront)

Voice Assistant: Alexa Skills Kit (ASK)


Prerequisites

Python 3.8+

Node.js 14+

AWS CLI (for deployment)

PostgreSQL (for local development)

Alexa Developer Console account


Installation and Setup

Backend (Django)

1. Clone the repository:

git clone https://github.com/yourusername/health-wellness-companion.git
cd health-wellness-companion/backend


2. Create a virtual environment:

python3 -m venv venv
source venv/bin/activate


3. Install dependencies:

pip install -r requirements.txt


4. Set up the database:

Ensure PostgreSQL is running.

Create a database and update the settings.py file with your database credentials.

Run migrations:

python manage.py migrate



5. Run the server:

python manage.py runserver



Frontend (React)

1. Navigate to the frontend folder:

cd ../frontend


2. Install dependencies:

npm install


3. Start the React application:

npm start



Alexa Integration

1. Set up your Alexa Skill:

Use the Alexa Developer Console to create a new skill.

Link the skill to your Django backend's webhook endpoint.

Define intents and utterances for logging activities and retrieving health insights.




Deployment to AWS

1. Backend Deployment:

Use AWS Elastic Beanstalk:

eb




