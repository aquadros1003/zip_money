import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from transactions.models import Transaction
from graphene_django.filter import DjangoFilterConnectionField
from api.schema.transactions import TransactionNode


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (graphene.relay.Node,)
        exclude = ("password",)
        filter_fields = {
            "username": ["exact", "icontains", "istartswith"],
            "email": ["exact", "icontains"],
        }

    transactions = DjangoFilterConnectionField(
        TransactionNode, filterset_class=None
    )

    def resolve_transactions(self, info, **kwargs):
        return Transaction.objects.filter(user=self)
