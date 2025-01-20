# Generated by Django 4.2.18 on 2025-01-20 00:51

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('water_intake', models.PositiveIntegerField(default=0)),
                ('exercise_duration', models.PositiveIntegerField(default=0)),
                ('steps_count', models.PositiveIntegerField(default=0)),
                ('calories_burned', models.PositiveIntegerField(default=0)),
                ('medication_count', models.PositiveIntegerField(default=0)),
                ('food_intake', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='PhysicalActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('activity_type', models.CharField(max_length=100)),
                ('duration_minutes', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='WaterIntake',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('amount_ml', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
