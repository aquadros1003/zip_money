import graphene
from api.mutations.user import UserMutation
from api.schema.user import UserNode
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    me = graphene.Field(UserNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in")
        return user


class Mutation(UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
