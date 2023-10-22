import graphene
import graphql_jwt
from django.contrib.auth import get_user_model

from api.schema.user import UserNode


class SignUp(graphene.Mutation):
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

        return SignUp(user=user)


class UserMutation(graphene.ObjectType):
    sign_in = graphql_jwt.ObtainJSONWebToken.Field()
    sing_up = SignUp.Field()
