from django.contrib import admin
from django.urls import path, include
from auth.views import AuthView

from auth.open_api_schema import DecoratedAuthView

app_name = "authentication"

urlpatterns = [
    path('token/', DecoratedAuthView, name="create_token")
]
