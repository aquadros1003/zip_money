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
from graphql_relay import from_global_id
from graphene_django_pagination import DjangoPaginationConnectionField


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

    transactions = DjangoPaginationConnectionField(
        TransactionNode,
        currency_id=graphene.ID(),
        category_id=graphene.ID(),
        budget_id=graphene.ID(),
        last_days_range=graphene.Int(),
        date_from=graphene.DateTime(),
        date_to=graphene.DateTime(),
    )
    daily_expenses = graphene.Float()
    monthly_expenses = graphene.Float()
    monthly_transactions = relay.ConnectionField(DailyTransactionConnection)
    pinned_budget = graphene.Field(BudgetAssignedUserNode)
    budgets = DjangoFilterConnectionField(BudgetAssignedUserNode, filterset_class=None)
    invitations = DjangoFilterConnectionField(
        BudgetAssignedUserNode, filterset_class=None
    )

    def resolve_transactions(self, info, **kwargs):
        query = Transaction.objects.filter(user=self)
        if kwargs.get("currency_id"):
            query = query.filter(
                currency_id=from_global_id(kwargs.get("currency_id"))[1]
            )
        if kwargs.get("category_id"):
            query = query.filter(
                category_id=from_global_id(kwargs.get("category_id"))[1]
            )
        if kwargs.get("budget_id"):
            query = query.filter(budget_id=from_global_id(kwargs.get("budget_id"))[1])
        if kwargs.get("last_days_range"):
            query = query.filter(
                date__gte=datetime.datetime.now()
                - datetime.timedelta(days=kwargs.get("last_days_range"))
            )
        if kwargs.get("date_from"):
            query = query.filter(date__gte=kwargs.get("date_from"))
        if kwargs.get("date_to"):
            query = query.filter(date__lte=kwargs.get("date_to"))
        return query.order_by("-date")

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
        return BudgetAssignedUser.objects.filter(
            user=self, status=BudgetAssignedUser.STATUS.ACCEPTED
        )

    def resolve_invitations(self, info, **kwargs):
        return BudgetAssignedUser.objects.filter(
            user=self, status=BudgetAssignedUser.STATUS.PENDING
        )
