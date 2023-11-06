import graphene
from graphql_jwt import mutations
from users.services.user import UserService


class SignUp(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        confirm_password = graphene.String(required=True)

    def mutate(self, info, username, email, password, confirm_password):
        user_service = UserService()
        success = user_service.register(
            username, email, password, confirm_password
        )
        return SignUp(success=success)
    
    


class UserMutation(graphene.ObjectType):
    sign_in = mutations.ObtainJSONWebToken.Field()
    sing_up = SignUp.Field()
