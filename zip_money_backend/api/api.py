import graphene
from api.mutations.user import UserMutation
from api.mutations.budget import BudgetMutation
from api.schema.user import UserNode
from api.schema.transactions import CurrencyNode
from transactions.models import Currency
from graphene_django.filter import DjangoFilterConnectionField


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
