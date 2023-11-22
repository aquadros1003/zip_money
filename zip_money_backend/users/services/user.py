import jwt
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.template import engines
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from graphql_jwt.shortcuts import create_refresh_token, get_token
from users.models import User

from zip_money_backend.settings import BASE_DIR


class UserService:
    def __init__(self) -> None:
        self.token_generator = PasswordResetTokenGenerator()

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
        self._send_confirmation_email(user)
        user.save()
        return True

    def login(self, info, email: str, password: str) -> tuple:
        if user := authenticate(email=email, password=password):
            token = get_token(user)
            info.context.jwt_token = token
            info.context.jwt_refresh_token = create_refresh_token(user)
            return user, token
        raise Exception("Invalid credentials")

    def social_auth(self, info, client_id: str, credentials: str) -> None:
        if client_id != settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY:
            raise Exception("Invalid client id")
        user_info = jwt.decode(
            credentials, options={"verify_signature": False}
        )
        if (
            user := get_user_model()
            .objects.filter(email=user_info["email"])
            .first()
        ):
            info.context.jwt_token = get_token(user)
            info.context.jwt_refresh_token = create_refresh_token(user)
            return user
        user = get_user_model()(
            email=user_info["email"],
            first_name=user_info["given_name"],
            last_name=user_info["family_name"],
        )
        user.save()
        info.context.jwt_token = get_token(user)
        info.context.jwt_refresh_token = create_refresh_token(user)
        return user

    def logout(self, info) -> bool:
        if info.context.user.is_anonymous:
            raise Exception("User is not logged in")
        info.context.delete_jwt_cookie = True
        info.context.delete_refresh_token_cookie = True
        return True

    def _send_confirmation_email(self, user: User):
        subject = "Potwierdzenie rejestracji"
        engine = engines["django"]
        template = engine.from_string(
            open(f"{BASE_DIR}/templates/emails/confirmation.html").read()
        )
        context = {
            "user": user,
            "domain": "localhost:8000",
            "uid": urlsafe_base64_encode(force_bytes(user.id)),
            "token": self.token_generator.make_token(user),
        }
        message = template.render(context)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [
            user.email,
        ]
        send_mail(subject, message, email_from, recipient_list)
