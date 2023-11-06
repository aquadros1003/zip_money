from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail


class UserService:
    def register(
        self, username: str, email: str, password: str, confirm_password: str
    ) -> bool:
        if get_user_model().objects.filter(email=email).exists():
            raise Exception("Email already exists")
        if get_user_model().objects.filter(username=username).exists():
            raise Exception("Username already exists")
        if password != confirm_password:
            raise Exception("Password and confirm password do not match")
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        self._send_confirmation_email(user.email)
        return True

    def _send_confirmation_email(self, email: str):
        subject = "Potwierdzenie rejestracji"
        message = "Dziękujemy za rejestrację na naszym serwisie."
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [
            email,
        ]
        send_mail(subject, message, email_from, recipient_list)
