from unicodedata import category
import graphene
from transactions.models import Transaction, Category, Currency
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

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

