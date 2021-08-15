"""
Package: auth
Module : views.py
Author : George Ricardo

This module has been created to handle request and return a response from Authentication resource.
"""
import json

from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import PermissionDenied
from django.utils.module_loading import import_string
from rest_framework import status
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from oauth2_provider.views import TokenView


User = get_user_model()
UserSerializer = import_string(settings.AUTH_USER_SERIALIZER)


class AuthView(generics.CreateAPIView):
    """
    View to authenticate user, throuth this view, we can access the oauth2
    endpoint to create and return a token.
    """
    
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        
        # validate user
        username = request.data.get("username")
        password = request.data.get("password")
    
        user = authenticate(username=username, password=password)
        
        if not user:
            raise PermissionDenied

        serializer = UserSerializer(instance=user, context={"request": request})

        url, headers, body, status_code = TokenView().create_token_response(request)

        body = json.loads(body)
        body["user"] = serializer.data

        return Response(body, status=status.HTTP_201_CREATED)
