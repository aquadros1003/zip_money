# Generated by Django 5.0 on 2023-12-14 21:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("transactions", "0002_transaction_budget"),
    ]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="name",
            field=models.CharField(default="BRAK", max_length=100),
            preserve_default=False,
        ),
    ]
