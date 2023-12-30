import graphene
from graphql_relay import from_global_id

from api.schema.transactions import TransactionNode
from transactions.services.transaction import TransactionService
from budget.models import Budget


class CreateTransaction(graphene.Mutation):
    transaction = graphene.Field(TransactionNode)

    class Arguments:
        name = graphene.String(required=True)
        amount = graphene.Decimal(required=True)
        category_id = graphene.String(required=True)
        currency_id = graphene.String(required=False)
        budget_id = graphene.String(required=False)

    def mutate(self, info, name, amount, category_id, currency_id=None, budget_id=None):
        transaction_service = TransactionService()
        category_pk = from_global_id(category_id)[1]
        if budget_id:
            budget_pk = from_global_id(budget_id)[1]
            currency_pk = Budget.objects.get(id=budget_pk).currency.id
            transaction = transaction_service.create_transaction(
                info, name, amount, category_pk, currency_pk, budget_pk
            )
        else:
            currency_pk = from_global_id(currency_id)[1]
            transaction = transaction_service.create_transaction(
                info, name, amount, category_pk, currency_pk
            )
        return CreateTransaction(transaction=transaction)


class TransactionMutation(graphene.ObjectType):
    create_transaction = CreateTransaction.Field()
