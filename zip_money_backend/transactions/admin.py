from django.contrib import admin
from transactions.models import Transaction, Category, Currency

# Register your models here.

admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Currency)