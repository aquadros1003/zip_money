from re import M
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator,
    EmailValidator,
    RegexValidator,
)


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

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def __repr__(self):
        return self.__str__()
