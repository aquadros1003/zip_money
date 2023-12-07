from django.db import models
from users.models import User
from transactions.models import Currency, Transaction
from django.utils import timezone


class Budget(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    budget = models.FloatField(default=0)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateField()

    def __str__(self):
        return self.name

    def get_remaining_budget(self):
        return self.budget - self.get_total_spent()

    def get_total_spent(self):
        total_spent = 0
        for transaction in Transaction.objects.filter(budget=self):
            total_spent += transaction.amount
        return total_spent

    @property
    def owner(self):
        return (
            BudgetAssignedUser.objects.filter(budget=self, is_owner=True)
            .first()
            .user
        )


class BudgetAssignedUser(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_owner = models.BooleanField(default=False)
    is_pined = models.BooleanField(default=False)

    def __str__(self):
        return self.budget.name + " " + self.user.email

    def pin_budget(self):
        for budget in BudgetAssignedUser.objects.filter(user=self.user):
            budget.is_pined = False
            budget.save()
        self.is_pined = True
        self.save()
