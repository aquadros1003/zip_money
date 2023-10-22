import graphene
import graphql_jwt
from django.contrib.auth import get_user_model

from api.schema.user import UserNode


class Register(graphene.Mutation):
    user = graphene.Field(UserNode)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return Register(user=user)


class UserMutation(graphene.ObjectType):
    login = graphql_jwt.ObtainJSONWebToken.Field()
    register = Register.Field()
