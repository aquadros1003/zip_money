import graphene
from django.contrib.auth import get_user_model

from api.mutations.user import UserMutation
from api.schema.user import UserNode


class Query(graphene.ObjectType):
    user = graphene.Field(UserNode, id=graphene.Int())

    def resolve_user(self, info, **kwargs):
        id = kwargs.get("id")
        if id is not None:
            return get_user_model.objects.get(pk=id)
        return None


class Mutation(UserMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
