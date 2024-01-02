import graphene
from graphene_django import DjangoObjectType

from report.models import Report


class ReportNode(DjangoObjectType):
    class Meta:
        model = Report
        interfaces = (graphene.relay.Node,)
        filter_fields = {
            "report_url": ["exact", "icontains", "istartswith"],
        }
