import graphene
import graphql_jwt
from api.schema.user import UserNode
from graphene_file_upload.scalars import Upload
from users.services.user import UserService


class SignUp(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        confirm_password = graphene.String(required=True)

    def mutate(
        self, info, first_name, last_name, email, password, confirm_password
    ):
        user_service = UserService()
        success = user_service.register(
            first_name, last_name, email, password, confirm_password
        )
        return SignUp(success=success)


class SignIn(graphene.Mutation):
    user = graphene.Field(UserNode)
    token = graphene.String()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password):
        user_service = UserService()
        user, token = user_service.login(info, email, password)
        return SignIn(user=user, token=token)


class SignOut(graphene.Mutation):
    success = graphene.Boolean()

    def mutate(self, info):
        user_service = UserService()
        success = user_service.logout(info)
        return SignOut(success=success)


class SocialAuth(graphene.Mutation):
    user = graphene.Field(UserNode)

    class Arguments:
        client_id = graphene.String()
        credentials = graphene.String()

    def mutate(self, info, client_id, credentials):
        user_service = UserService()
        user = user_service.social_auth(info, client_id, credentials)
        return SocialAuth(user=user)


class UserMutation(graphene.ObjectType):
    sign_in = SignIn.Field()
    sing_up = SignUp.Field()
    sign_out = SignOut.Field()
    social_auth = SocialAuth.Field()
    refresh_token = graphql_jwt.Refresh.Field()
