# Generated by Django 5.0 on 2023-12-06 22:09

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("budget", "0003_delete_budgettransaction"),
    ]

    operations = [
        migrations.AlterField(
            model_name="budget",
            name="start_date",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]