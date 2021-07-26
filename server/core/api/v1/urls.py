from django.urls import path

from core.api.v1.views import MineSweeperCreateView, MineSweeperRetrieveUpdateView

app_name = "minesweeper"

urlpatterns = [
    path('', MineSweeperCreateView.as_view(), name="create_game"),
    path('<int:pk>/', MineSweeperRetrieveUpdateView.as_view(), name="update_game")
]