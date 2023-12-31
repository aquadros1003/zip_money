import django_filters

from transactions.models import Transaction
import datetime


class TransactionFilter(django_filters.FilterSet):
    range = django_filters.DateFromToRangeFilter(method="date_filter")
    last_days_range = django_filters.NumberFilter(method="last_days_range_filter")

    class Meta:
        model = Transaction
        fields = ["range", "last_days_range", "category_id"]

    def date_filter(self, queryset, name, value):
        return queryset.filter(date__range=value)

    def last_days_range_filter(self, queryset, name, value):
        return queryset.filter(
            date__gte=datetime.datetime.now() - datetime.timedelta(days=int(value))
        )

    def category_id_filter(self, queryset, name, value):
        return queryset.filter(category_id=value)
