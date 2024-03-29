# Generated by Django 4.2.6 on 2023-10-26 20:22

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="birth_date",
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                max_length=254,
                unique=True,
                validators=[django.core.validators.EmailValidator()],
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(
                max_length=30,
                validators=[
                    django.core.validators.MinValueValidator(8),
                    django.core.validators.MaxValueValidator(30),
                    django.core.validators.RegexValidator("^[a-zA-Z0-9]*$"),
                ],
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(
                max_length=30,
                unique=True,
                validators=[
                    django.core.validators.MinValueValidator(8),
                    django.core.validators.MaxValueValidator(30),
                ],
            ),
        ),
    ]
