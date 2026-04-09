# Django Imports
from django.shortcuts import redirect
from django.urls import reverse
from django.conf import settings
from django.db.utils import OperationalError

# Local Imports
from cms.models import Page


def index(request):
    try:
        page = Page.objects.filter(title=settings.HOME_PAGE_TITLE)

        if page.exists():
            return redirect(reverse("cms:home", args=[page.first().permalink]))

    except OperationalError:
        # CMS table not created yet
        pass

    # Fallback: always safe
    return redirect("/workshop/types/")
