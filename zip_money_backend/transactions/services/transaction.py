import datetime as dt

from django.conf import settings

from transactions.models import Currency, Transaction
from users.models import User
from zip_money_backend.settings import BASE_DIR


class TransactionService:
    def create_transaction(
        self,
        info,
        name: str,
        amount: float,
        category_id: int,
        currency_id: int = None,
        budget_id: int = None,
    ) -> Transaction:
        user = info.context.user
        if user.is_authenticated:
            currency = Currency.objects.get(id=currency_id)
            transaction = Transaction(
                name=name,
                amount=amount,
                category_id=category_id,
                currency_id=currency.id,
                budget_id=budget_id,
                user=user,
            )
            transaction.save()
            return transaction
        raise Exception("Not authenticated")
