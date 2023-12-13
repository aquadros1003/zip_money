import datetime

import graphene
from django.contrib.auth import get_user_model
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from api.schema.budget import BudgetAssignedUserNode
from api.schema.transactions import (
    DailyTransactionConnection,
    DailyTransactionNode,
    TransactionNode,
)
from budget.models import BudgetAssignedUser
from transactions.models import Transaction


class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (graphene.relay.Node,)
        exclude = (
            "password",
            "is_superuser",
            "is_staff",
            "groups",
            "user_permissions",
        )
        filter_fields = {
            "username": ["exact", "icontains", "istartswith"],
            "email": ["exact", "icontains"],
        }

    transactions = DjangoFilterConnectionField(TransactionNode, filterset_class=None)
    daily_expenses = graphene.Float()
    monthly_expenses = graphene.Float()
    monthly_transactions = relay.ConnectionField(DailyTransactionConnection)
    pinned_budget = graphene.Field(BudgetAssignedUserNode)
    budgets = DjangoFilterConnectionField(BudgetAssignedUserNode, filterset_class=None)

    def resolve_transactions(self, info, **kwargs):
        return Transaction.objects.filter(user=self).order_by("-date")

    def resolve_daily_expenses(self, info, **kwargs):
        transactions = Transaction.objects.filter(
            user=self, date__day=datetime.datetime.now().day
        )
        return sum([t.amount for t in transactions])

    def resolve_monthly_expenses(self, info, **kwargs):
        transactions = Transaction.objects.filter(
            user=self, date__month=datetime.datetime.now().month
        )
        return sum([t.amount for t in transactions])

    def resolve_monthly_transactions(self, info, **kwargs):
        monthly_days = [
            datetime.datetime.now() - datetime.timedelta(days=i) for i in range(12)
        ]
        daily_amounts = []
        for day in monthly_days:
            daily_transactions = Transaction.objects.filter(
                date__day=day.day, user=self
            )
            if not daily_transactions:
                daily_amounts.append(
                    DailyTransactionNode(
                        day_date=day.strftime("%d %b"),
                        amount=0,
                    )
                )
                continue
            daily_amounts.append(
                DailyTransactionNode(
                    day_date=day.strftime("%d %b"),
                    amount=sum([t.amount for t in daily_transactions]),
                )
            )
        return daily_amounts

    def resolve_pinned_budget(self, info, **kwargs):
        return BudgetAssignedUser.objects.filter(user=self, is_pined=True).first()

    def resolve_budgets(self, info, **kwargs):
        return BudgetAssignedUser.objects.filter(user=self).order_by("-is_pined")
