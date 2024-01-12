import graphene
from graphene_django import DjangoObjectType

from budget.models import Budget, BudgetAssignedUser
from graphene_django.filter import DjangoFilterConnectionField


class BudgetNode(DjangoObjectType):
    class Meta:
        model = Budget
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
        }

    remaining_budget = graphene.Float()
    spent_remaining_percentage = graphene.Int()
    owner = graphene.Field("api.schema.user.UserNode")
    assigned_users = DjangoFilterConnectionField(
        "api.schema.budget.BudgetAssignedUserNode", filterset_class=None
    )

    def resolve_remaining_budget(self, info, **kwargs):
        return self.budget - self.get_total_spent()

    def resolve_spent_remaining_percentage(self, info, **kwargs):
        remaining_budget = self.budget - self.get_total_spent()
        return (
            int((remaining_budget / self.budget) * 100) if remaining_budget > 0 else 0
        )

    def resolve_owner(self, info, **kwargs):
        return self.owner

    def resolve_assigned_users(self, info, **kwargs):
        return BudgetAssignedUser.objects.filter(budget=self).order_by("-is_owner")


class BudgetAssignedUserNode(DjangoObjectType):
    class Meta:
        model = BudgetAssignedUser
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "is_owner": ["exact"],
        }
