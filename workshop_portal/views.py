# Django Imports
from django.shortcuts import redirect


def index(request):
    return redirect('/workshop/types/')
