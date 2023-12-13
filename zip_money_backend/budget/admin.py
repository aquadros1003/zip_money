from django.contrib import admin

from .models import Budget, BudgetAssignedUser

admin.site.register(Budget)
admin.site.register(BudgetAssignedUser)
