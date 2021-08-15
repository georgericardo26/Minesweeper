from rest_framework import serializers

class AuthTokenSerializer(serializers.Serializer):
    client_id = serializers.CharField()
    client_secret = serializers.CharField()
    grant_type = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField()

class AuthTokenResponseSerializer(serializers.Serializer):
    access_token = serializers.CharField()
    expires_in = serializers.IntegerField()
    token_type = serializers.CharField()
    scope = serializers.CharField()
    refresh_token = serializers.CharField()
