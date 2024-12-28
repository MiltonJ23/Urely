# Setup Instructions for Each Layer

This guide provides the setup instructions for the **UI Layer**, **Domain Layer**, and **Data Layer** of your project.

---

## **UI Layer (React)**

### Prerequisites
- Install [Node.js](https://nodejs.org/) (LTS version recommended).

### Steps
1. **Initialize React App**:
   ```bash
   cd Ui_Layer
   ```

2. **Install dependencies**:
   ```bash
   npm i --legacy-peer-deps
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

---

## **Domain Layer (FastAPI)**

### Prerequisites
- Install [Python](https://www.python.org/) (3.9+ recommended).
- Install [pip](https://pip.pypa.io/en/stable/).

### Steps
1. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv     # On windows: python -m venv venv
   source venv/bin/activate     # On Windows: venv\Scripts\activate
   ```

2. **Install FastAPI and Uvicorn**:
   ```bash
   pip install fastapi uvicorn fastapi-jwt-auth python-decouple # OR pip install "fastapi[all]"
   ```

    
4. **Run the Server**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. **Setup Environment Variables**:
   - Create a `.env` file:
     ```env
     AUTHJWT_SECRET_KEY=your_secret_key
     ```

---

## **Data Layer (Django)**

### Prerequisites
- Install [Python](https://www.python.org/) (3.9+ recommended).
- Install [pip](https://pip.pypa.io/en/stable/).

### Steps
1. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv     # On windows: python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

2. **Install Django and Django REST Framework**:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt 
   ```


4. **Make Migrations**:
   ```bash
   python manage.py makemigrations
   ```

4. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Start the Development Server**:
   ```bash
   python manage.py runserver
   ```

---