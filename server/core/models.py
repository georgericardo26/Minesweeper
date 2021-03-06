"""
Package: core
Module : models.py
Author : George Ricardo

This module has been created to handle data models coming from database.
"""

import uuid

from functools import reduce
from django.db import models
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.conf import settings
from django.core.exceptions import NON_FIELD_ERRORS, ValidationError, PermissionDenied
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    createAt = models.DateTimeField(auto_now_add=True, auto_created=True)
    updateAt = models.DateTimeField(auto_now=True, auto_created=True)
    isDeleted = models.BooleanField(null=False, default=False)


class BoardModel(models.Model):
    """
    This Model represent the board game containg the main attributes related to the game.
    """
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    rows_number = models.IntegerField(null=False, blank=False, default=9)
    cols_number = models.IntegerField(null=False, blank=False, default=9)
    mines_number = models.IntegerField(null=False, blank=False, default=9)
    end_game = models.BooleanField(default=False)
    is_winner = models.BooleanField(default=False)
    square_remaining = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, auto_created=True)

    @property
    def selected_level(self):
        return self.LEVELS[self.level]
    
    @property
    def board_sizes(self):
        return self.rows_number, self.cols_number

    @property
    def number_of_places(self):
        return reduce((lambda x, y: x * y), self.board_sizes)

    @property
    def is_expired(self):
        time = timezone.now() - self.created_at
        return time.seconds > settings.MAX_LIMIT_TIME_SECONDS

    def __repr__(self) -> str:
        return f"<BoardModel: IsWinner: {self.is_winner}, EndGame: {self.end_game} >"

class RowModel(models.Model):
    """
    This Model represent each board's row.
    """
    index = models.IntegerField(null=True, blank=True)
    board = models.ForeignKey(BoardModel, null=False, blank=False, related_name="rows", on_delete=CASCADE)

    def __repr__(self) -> str:
        return f"<RowModel: {self.index} >"
    
    class Meta:
        ordering = ["index"]

class SquareItemModel(models.Model):
    """
    This Model represent each board's place, containing attributes related to the item.
    """
    index = models.IntegerField(null=True, blank=True)
    adj_mines = models.IntegerField(default=0)
    is_selected = models.BooleanField(default=False)
    is_mine = models.BooleanField(default=False)
    is_flaged = models.BooleanField(default=False)
    row = models.ForeignKey(RowModel, null=False, blank=False, related_name="square_items", on_delete=CASCADE)
    board = models.ForeignKey(BoardModel, null=True, blank=True, related_name="square_items", on_delete=CASCADE)
    
    def __repr__(self) -> str:
        return f"<SquareItemModel: {self.adj_mines}, IsSelected: {self.is_selected}>"
    
    class Meta:
        ordering = ["index"]
