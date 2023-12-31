import graphene
from graphql_relay import from_global_id

from api.schema.budget import BudgetAssignedUserNode, BudgetNode
from budget.services.budget import BudgetService


class CreateBudget(graphene.Mutation):
    budget = graphene.Field(BudgetNode)

    class Arguments:
        name = graphene.String(required=True)
        amount = graphene.Decimal(required=True)
        currency_id = graphene.String(required=True)
        end_date = graphene.DateTime(required=True)
        description = graphene.String(required=False)

    def mutate(self, info, name, amount, currency_id, end_date, description):
        budget_service = BudgetService()
        currency_id = from_global_id(currency_id)[1]
        budget = budget_service.create_budget(
            info, name, amount, currency_id, end_date, description
        )
        return CreateBudget(budget=budget)


class PinBudget(graphene.Mutation):
    budget = graphene.Field(BudgetAssignedUserNode)

    class Arguments:
        budget_id = graphene.ID(required=True)

    def mutate(self, info, budget_id):
        budget_service = BudgetService()
        budget_id = from_global_id(budget_id)[1]
        budget = budget_service.pin_budget(info, budget_id)
        return PinBudget(budget=budget)


class InviteUser(graphene.Mutation):
    budget = graphene.Field(BudgetAssignedUserNode)

    class Arguments:
        budget_id = graphene.ID(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, budget_id, email):
        budget_service = BudgetService()
        budget_id = from_global_id(budget_id)[1]
        budget = budget_service.invite_user(info, budget_id, email)
        return InviteUser(budget=budget)


class AcceptBudget(graphene.Mutation):
    budget = graphene.Field(BudgetAssignedUserNode)

    class Arguments:
        budget_id = graphene.ID(required=True)

    def mutate(self, info, budget_id):
        budget_service = BudgetService()
        budget_id = from_global_id(budget_id)[1]
        budget = budget_service.accept_budget(info, budget_id)
        return AcceptBudget(budget=budget)


class RejectBudget(graphene.Mutation):
    budget = graphene.Field(BudgetAssignedUserNode)

    class Arguments:
        budget_id = graphene.ID(required=True)

    def mutate(self, info, budget_id):
        budget_service = BudgetService()
        budget_id = from_global_id(budget_id)[1]
        budget = budget_service.reject_budget(info, budget_id)
        return RejectBudget(budget=budget)


class BudgetMutation(graphene.ObjectType):
    create_budget = CreateBudget.Field()
    pin_budget = PinBudget.Field()
    invite_user = InviteUser.Field()
    accept_budget = AcceptBudget.Field()
    reject_budget = RejectBudget.Field()
