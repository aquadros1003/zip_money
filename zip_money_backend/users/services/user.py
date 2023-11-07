from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from graphql_jwt.shortcuts import get_token, create_refresh_token
from django.contrib.auth import authenticate


class UserService:
    def register(
        self,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        confirm_password: str,
    ) -> bool:
        if get_user_model().objects.filter(email=email).exists():
            raise Exception("Email already exists")
        if password != confirm_password:
            raise Exception("Password and confirm password do not match")
        user = get_user_model()(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        self._send_confirmation_email(user.email)
        return True

    def login(self, email: str, password: str) -> tuple:
        user = authenticate(email=email, password=password)
        if user:
            token = get_token(user)
            return user, token
        raise Exception("Invalid credentials")

    def _send_confirmation_email(self, email: str):
        subject = "Potwierdzenie rejestracji"
        message = "Dziękujemy za rejestrację na naszym serwisie."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [
            email,
        ]
        send_mail(subject, message, email_from, recipient_list)
