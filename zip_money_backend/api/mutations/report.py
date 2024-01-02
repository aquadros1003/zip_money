import graphene
from graphql_relay import from_global_id

from api.schema.report import ReportNode
from report.services.creator import ReportService


class CreateReport(graphene.Mutation):
    report = graphene.Field(ReportNode)

    class Arguments:
        currency_id = graphene.ID()
        category_id = graphene.ID()
        budget_id = graphene.ID()
        last_days_range = graphene.Int()
        date_from = graphene.DateTime()
        date_to = graphene.DateTime()

    def mutate(
        self,
        info,
        last_days_range=None,
        currency_id=None,
        category_id=None,
        budget_id=None,
        date_from=None,
        date_to=None,
    ):
        report_service = ReportService()
        if currency_id:
            currency_id = from_global_id(currency_id)[1]
        if category_id:
            category_id = from_global_id(category_id)[1]
        if budget_id:
            budget_id = from_global_id(budget_id)[1]
        report = report_service.create_report(
            info,
            currency_id,
            category_id,
            budget_id,
            last_days_range,
            date_from,
            date_to,
        )
        return CreateReport(report=report)


class ReportMutation(graphene.ObjectType):
    create_report = CreateReport.Field()
