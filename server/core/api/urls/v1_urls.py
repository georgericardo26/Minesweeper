from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

app_name = "v1"


schema_view = get_schema_view(
   openapi.Info(
      title="Minesweeper API",
      default_version='v1',
      description="The rest API for minesweeper game",
      terms_of_service="",
      contact=openapi.Contact(email="georgericardo26@gmail.com"),
      license=openapi.License(name=""),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    re_path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    re_path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]