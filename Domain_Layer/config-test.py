import os, sys
from django import setup

# Set the environment variable
os.environ['DJANGO_SETTINGS_MODULE'] = 'core.settings'

# Add the Django project to the python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'DataLayer')))

# Iniitialize Django
setup()


from user.models import User
from user.views import test
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
    return {'Data': 'Hello there'}

test()