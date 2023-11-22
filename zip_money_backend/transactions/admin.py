from django.contrib import admin
from transactions.models import Category, Currency, Transaction

# Register your models here.

admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Currency)
