from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def apiOverview(request):
    return HttpResponse('API')