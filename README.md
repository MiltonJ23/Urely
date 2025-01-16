# Urely

## Health and Wellness Companion

### Overview

Health and Wellness Companion is a web-based application designed to help users track their health and wellness through Alexa-enabled voice commands. The application provides a dashboard with health insights and integrates with African doctors via APIs.

### Features

- **Alexa Integration**: Log daily activities like water intake, exercise, and medication reminders through voice commands.
- **Health Dashboard**: View personalized health insights and recommendations.
- **Book appointment with doctors**.

### Technologies Used

- **Backend**: Django, Django Rest Framework
- **Frontend**: React, Material-UI
- **Cloud**: AWS (Elastic Beanstalk, RDS, S3, CloudFront)
- **Voice Assistant**: Alexa Skills Kit (ASK)

### Prerequisites

- Python 3.8+
- Node.js 14+
- AWS CLI (for deployment)
- PostgreSQL (for local development)
- Alexa Developer Console account

### Installation and Setup

#### Backend (Django)

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/Urely.git
    cd Urely/Domain_layer
    ```

2. **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the database**:
    - Ensure PostgreSQL is running.
    - Create a database and update the `settings.py` file with your database credentials.
    - Run migrations:
    ```bash
    python manage.py migrate
    ```

5. **Run the server**:
    ```bash
    python manage.py runserver
    ```

#### Frontend (React)

1. **Navigate to the frontend folder**:
    ```bash
    cd ../UI_Layer/React-mui-dashboard-template
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the React application**:
    ```bash
    npm start
    ```

#### Alexa Integration

1. **Set up your Alexa Skill**:
    - Use the Alexa Developer Console to create a new skill.
    - Link the skill to your Django backend's webhook endpoint.
    - Define intents and utterances for logging activities and retrieving health insights.

2. **Set up your Amazon Lex bot**:
    - Since alexa works mostly on amazon devices, we have to look for an aternative.
    - Set-up your bot in your AWS account together with the lambda function
    - Link the lambda function and bot to your Django backend's webhook endpoint.
    - Define intents and utterances for logging activities and retrieving health insights.

