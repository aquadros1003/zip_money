import graphene
from graphene_django import DjangoObjectType
from budget.models import Budget, BudgetAssignedUser


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

    def resolve_remaining_budget(self, info, **kwargs):
        return self.budget - self.get_total_spent()

    def resolve_spent_remaining_percentage(self, info, **kwargs):
        return (self.budget - self.get_total_spent()) / self.budget * 100

    def resolve_owner(self, info, **kwargs):
        return self.owner


class BudgetAssignedUserNode(DjangoObjectType):
    class Meta:
        model = BudgetAssignedUser
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "is_owner": ["exact"],
        }
