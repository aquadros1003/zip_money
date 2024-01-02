from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from django.views import View
from report.services.creator import ReportCreator
from .models import Report


class ReportView(View):
    def get(self, request, *args, **kwargs):
        report = Report.objects.get(pk=kwargs["pk"])
        report_creator = ReportCreator(report.template_path, report.context)
        pdf = report_creator.generate_pdf()
        if pdf:
            response = HttpResponse(pdf, content_type="application/pdf")
            filename = "Report_%s.pdf" % ("12341231")
            content = "inline; filename='%s'" % (filename)
            download = request.GET.get("download")
            if download:
                content = "attachment; filename='%s'" % (filename)
            response["Content-Disposition"] = content
            return response
        return HttpResponse("Not found")
