from budget.models import Budget, BudgetAssignedUser
from typing import Optional

import datetime as dt


class BudgetService:
    def __init__(self) -> None:
        pass

    def create_budget(
        self,
        info,
        name: str,
        amount: float,
        currency_id: int,
        end_date: dt.date,
        description: Optional[str] = None,
    ) -> Budget:
        user = info.context.user
        if user.is_authenticated:
            budget = Budget(
                name=name,
                budget=amount,
                currency_id=currency_id,
                end_date=end_date,
                description=description,
            )
            budget.save()
            assigned_budget = BudgetAssignedUser(
                budget_id=budget.id, user=user, is_owner=True
            )
            assigned_budget.save()
            if BudgetAssignedUser.objects.filter(
                user=user, is_pined=True
            ).first():
                return budget
            assigned_budget.is_pined = True
            assigned_budget.save()
            return budget
        raise Exception("Not authenticated")

    def pin_budget(self, info, budget_id: int) -> Budget:
        user = info.context.user
        if user.is_authenticated:
            budget = Budget.objects.filter(id=budget_id).first()
            if budget:
                assigned_budget = BudgetAssignedUser.objects.filter(
                    budget=budget, user=user
                ).first()
                if assigned_budget:
                    assigned_budget.pin_budget()
                    return assigned_budget
            raise Exception("Budget not found")
        raise Exception("Not authenticated")
