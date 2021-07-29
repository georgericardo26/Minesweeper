from django.contrib import admin

from core.models import User, BoardModel, RowModel, SquareItemModel


@admin.register(User)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'email', 'last_name', 'is_staff')

@admin.register(BoardModel)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'rows_number', 'cols_number', 'mines_number', 'end_game', 'is_winner', 'selected_level')

@admin.register(RowModel)
class RowAdmin(admin.ModelAdmin):
    list_display = ('id', 'board')

@admin.register(SquareItemModel)
class SquareItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'adj_mines', 'is_selected', 'is_mine', 'is_flaged')
