import graphene
from django.contrib.auth import get_user_model


class UserNode(graphene.ObjectType):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "username", "first_name", "last_name", "birth_date")

    name = graphene.String()
    email = graphene.String()

    def resolve_email(self, info):
        return self.email

    def resolve_name(self, info):
        return f"{self.first_name} {self.last_name}"
