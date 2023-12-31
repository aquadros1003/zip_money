# Generated by Django 5.0 on 2023-12-30 22:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0008_alter_user_is_active_alter_user_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="description",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="facebook_url",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="first_name",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="user",
            name="instagram_url",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                validators=[django.core.validators.RegexValidator("^[0-9]*$")],
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="twitter_url",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
