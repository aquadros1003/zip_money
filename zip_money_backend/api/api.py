import graphene
from graphene_django.filter import DjangoFilterConnectionField

from api.mutations.budget import BudgetMutation
from api.mutations.user import UserMutation
from api.schema.transactions import CurrencyNode
from api.schema.user import UserNode
from transactions.models import Currency


class Query(graphene.ObjectType):
    me = graphene.Field(UserNode)
    currencies = DjangoFilterConnectionField(CurrencyNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in")
        return user

    def resolve_currencies(self, info, **kwargs):
        return Currency.objects.all()


class Mutation(UserMutation, BudgetMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
