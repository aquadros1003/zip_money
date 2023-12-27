import django_filters

from transactions.models import Transaction
import datetime


class TransactionFilter(django_filters.FilterSet):
    range = django_filters.DateFromToRangeFilter(method="date_filter")
    category = django_filters.CharFilter(method="category_filter")
    last_days_range = django_filters.NumberFilter(method="last_days_range_filter")

    class Meta:
        model = Transaction
        fields = ["category"]

    def date_filter(self, queryset, name, value):
        return queryset.filter(date__range=value)

    def category_filter(self, queryset, name, value):
        return queryset.filter(category__name=value)

    def last_days_range_filter(self, queryset, name, value):
        print(value)
        return queryset.filter(
            date__gte=datetime.datetime.now() - datetime.timedelta(days=int(value))
        )
