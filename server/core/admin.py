from django.contrib import admin

from core.models import BoardModel, RowModel, SquareItemModel


@admin.register(BoardModel)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'level', 'end_game', 'is_winner', 'selected_level')

@admin.register(RowModel)
class RowAdmin(admin.ModelAdmin):
    list_display = ('id', 'board')

@admin.register(SquareItemModel)
class SquareItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'adj_mines', 'is_selected', 'is_mine', 'is_flaged')