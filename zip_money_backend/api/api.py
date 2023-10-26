import graphene
from api.mutations.user import UserMutation
from api.schema.user import UserNode
from django.contrib.auth import get_user_model
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    users = DjangoFilterConnectionField(UserNode)

    def resolve_users(self, info, **kwargs):
        return get_user_model().objects.all()


class Mutation(UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
