"""minesweeper URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.urls.conf import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls', namespace='api')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider'))
]
