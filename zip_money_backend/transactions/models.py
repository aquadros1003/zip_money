from django.db import models
from users.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Currency(models.Model):
    name = models.CharField(max_length=100)
    alias = models.CharField(max_length=3)
    symbol = models.CharField(max_length=1)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email + " - " + self.category.name