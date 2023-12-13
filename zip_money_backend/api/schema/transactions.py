import graphene
from graphene_django import DjangoObjectType

from transactions.models import Category, Currency, Transaction


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }


class CurrencyNode(DjangoObjectType):
    class Meta:
        model = Currency
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }


class TransactionNode(DjangoObjectType):
    class Meta:
        model = Transaction
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "amount": ["exact", "icontains"],
        }

    category = graphene.Field(CategoryNode)
    currency = graphene.Field(CurrencyNode)


class DailyTransactionNode(graphene.ObjectType):
    day_date = graphene.String()
    amount = graphene.Float()

    class Meta:
        interfaces = (graphene.relay.Node,)

    def from_amount_and_date(cls, date, amount):
        return cls(
            day_date=date,
            amount=amount,
        )


class DailyTransactionConnection(graphene.relay.Connection):
    class Meta:
        node = DailyTransactionNode
