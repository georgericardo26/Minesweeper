from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view

from django.utils.module_loading import import_string
from django.conf import settings

from auth.views import AuthView
from auth.serializers import AuthTokenSerializer, AuthTokenResponseSerializer

UserSerializer = import_string(settings.AUTH_USER_SERIALIZER)


# Auth
DecoratedAuthView = swagger_auto_schema(
      operation_description="Authentication method",
      method='post',
      request_body=AuthTokenSerializer,
      responses={
          status.HTTP_201_CREATED: AuthTokenResponseSerializer,
          status.HTTP_400_BAD_REQUEST: "Bad request",
          status.HTTP_404_NOT_FOUND: 'not found'
      }
   )(AuthView.as_view())
