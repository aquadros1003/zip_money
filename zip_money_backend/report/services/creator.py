from xhtml2pdf import pisa
from django.template.loader import get_template
from io import BytesIO
from transactions.models import Transaction
from report.models import Report
import datetime
import random


class ReportService:
    def create_report(
        self,
        info,
        currency_id=None,
        category_id=None,
        budget_id=None,
        last_days_range=None,
        date_from=None,
        date_to=None,
    ):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Not logged in")
        transactions = Transaction.objects.filter(
            user=user,
        )
        if currency_id:
            transactions = transactions.filter(currency_id=currency_id)
        if category_id:
            transactions = transactions.filter(category_id=category_id)
        if budget_id:
            transactions = transactions.filter(budget_id=budget_id)
        if last_days_range:
            transactions = transactions.filter(
                date__gte=datetime.datetime.now()
                - datetime.timedelta(days=last_days_range)
            )
        if date_from:
            transactions = transactions.filter(date__gte=date_from)
        if date_to:
            transactions = transactions.filter(date__lte=date_to)

        transactions = transactions.order_by("-date")
        template = get_template("report.html")
        context = {
            "transactions": transactions,
            "user": user,
        }
        html = template.render(context)

        filename = f"report-{random.randint(0, 100000)}.pdf"
        with open(f"media/{filename}", "wb") as pdf_file:
            ## with polish letters
            pisa_status = pisa.CreatePDF(
                html.encode("utf-8"), dest=pdf_file, encoding="utf-8"
            )
        if pisa_status.err:
            raise Exception("Error creating the report")

        report = Report(user=user, report_url=f"media/{filename}")
        report.save()
        return report
