import datetime as dt
from distutils.command import upload

import jwt
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.template import engines
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from graphene_file_upload.scalars import Upload
from graphql_jwt.shortcuts import create_refresh_token, get_token
from django.template.loader import get_template
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import JsonResponse
from django.utils.http import urlsafe_base64_decode

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
        user.save()
        self._send_confirmation_email(user)
        status = user.status
        status.verified = False
        status.save()
        return True

    def login(self, info, email: str, password: str) -> tuple:
        if user := authenticate(email=email, password=password):
            status = user.status
            if not status.verified:
                raise Exception("Email is not verified")
            token = get_token(user)
            info.context.jwt_token = token
            info.context.jwt_refresh_token = create_refresh_token(user)
            return user, token
        raise Exception("Invalid credentials")

    def activate(self, info, uidb64, token):
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
        if user is not None and PasswordResetTokenGenerator().check_token(user, token):
            user.status.verified = True
            user.status.save()
            user.save()
            return True
        return False

    def social_auth(self, info, client_id: str, credentials: str) -> None:
        if client_id != settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY:
            raise Exception("Invalid client id")
        user_info = jwt.decode(credentials, options={"verify_signature": False})
        if user := get_user_model().objects.filter(email=user_info["email"]).first():
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
        context = {
            "user": user,
            "domain": settings.FE_URL,
            "uid": urlsafe_base64_encode(force_bytes(user.id)),
            "token": self.token_generator.make_token(user),
            "path": "activate",
        }
        template = get_template("emails/confirmation.html")
        html = template.render(context)
        send_mail(
            "Confirm your email",
            "",
            settings.EMAIL_HOST_USER,
            [user.email],
            html_message=html,
        )

    def update_profile(
        self,
        info,
        first_name: str,
        last_name: str,
        phone_number: str,
        description: str,
        date_of_birth: dt.datetime,
        facebook_url: str,
        instagram_url: str,
        twitter_url: str,
    ) -> User:
        if not info.context.user.is_anonymous:
            user = info.context.user
            user.first_name = first_name
            user.last_name = last_name
            user.phone_number = phone_number
            user.description = description
            user.date_of_birth = date_of_birth
            user.facebook_url = facebook_url
            user.instagram_url = instagram_url
            user.twitter_url = twitter_url
            user.save()
            return user
        raise Exception("User is not logged in")

    def update_avatar(self, info, avatar: Upload) -> User:
        if not info.context.user.is_anonymous:
            user = info.context.user
            user.avatar = avatar
            user.save()
            return user
        raise Exception("User is not logged in")
