"""
Package: auth
Module : views.py
Author : George Ricardo

This module has been created to handle request and return a response from Authentication resource.
"""
import json

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.utils.module_loading import import_string
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import status
from oauth2_provider.views import TokenView


User = get_user_model()
UserSerializer = import_string(settings.AUTH_USER_SERIALIZER)


class AuthView(TokenView):

    @method_decorator(sensitive_post_parameters("password"))
    def post(self, request, *args, **kwargs):
        url, headers, body, status_code = self.create_token_response(request)

        if status_code == status.HTTP_200_OK:
            user_request = json.loads(request.body.decode("utf-8"))
            username = user_request.get("username")
            user = User.objects.get(username=username)

            serializer = UserSerializer(instance=user, context={"request": request})

            body = json.loads(body)
            body["user"] = serializer.data
            body = json.dumps(body)

        return HttpResponse(content=body, status=status_code)