from django.contrib.auth.models import AbstractUser
from django.core.validators import (
    EmailValidator,
    MaxValueValidator,
    MinValueValidator,
    RegexValidator,
)
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    username = models.CharField(
        max_length=255,
        validators=[MinValueValidator(8), MaxValueValidator(30)],
    )
    password = models.CharField(
        max_length=255,
        validators=[
            MinValueValidator(8),
            MaxValueValidator(30),
            RegexValidator(r"^[a-zA-Z0-9]*$"),
        ],
    )
    first_name = models.CharField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(30)],
    )
    last_name = models.CharField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(30)],
    )
    phone_number = models.CharField(
        max_length=255,
        validators=[
            MinValueValidator(8),
            MaxValueValidator(15),
            RegexValidator(r"^[0-9]*$"),
        ],
        null=True,
        blank=True,
    )
    facebook_url = models.CharField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(255)],
        null=True,
        blank=True,
    )
    twitter_url = models.CharField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(255)],
        null=True,
        blank=True,
    )
    instagram_url = models.CharField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(255)],
        null=True,
        blank=True,
    )
    description = models.TextField(
        max_length=255,
        validators=[MinValueValidator(2), MaxValueValidator(255)],
        null=True,
        blank=True,
    )
    date_of_birth = models.DateTimeField(null=True, blank=True)
    avatar = models.ImageField(
        upload_to="avatars/",
        null=True,
        blank=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def __repr__(self):
        return self.__str__()
