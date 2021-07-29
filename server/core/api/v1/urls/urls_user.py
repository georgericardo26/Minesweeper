from django.urls import path

from core.api.v1.views import UserCreateView, UserRetrieveUpdateView

app_name = "user"

urlpatterns = [
    path('', UserCreateView.as_view(), name="create_user"),
    path('<int:pk>/', UserRetrieveUpdateView.as_view(), name="update_retrieve_user")
]