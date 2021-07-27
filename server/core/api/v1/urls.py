from django.urls import path

from core.api.v1.views import MineSweeperCreateView, MineSweeperRetrieveUpdateView, MineSweeperSquareItemModelFlagUpdateView

app_name = "minesweeper"

urlpatterns = [
    path('', MineSweeperCreateView.as_view(), name="create_game"),
    path('<int:pk>/', MineSweeperRetrieveUpdateView.as_view(), name="update_game"),
    path('<int:pk>/flag', MineSweeperSquareItemModelFlagUpdateView.as_view(), name="set_or_remove_flag")
]