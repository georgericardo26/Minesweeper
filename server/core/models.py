from functools import reduce
from django.db import models
from django.db.models.deletion import CASCADE


class BoardModel(models.Model):
    """
    This Model represent the board game containg the main attributes related to the game.
    """
    LEVELS = {
        0: "9x9", #Beginner
        1: "16x16", #Intermediate
        2: "30x16" #Expert
    }

    level = models.CharField(null=False, blank=False, max_length=5, choices=list(LEVELS.items()))
    end_game = models.BooleanField(default=False)
    is_winner = models.BooleanField(default=False)

    @property
    def selected_level(self):
        return self.LEVELS[self.level]
    
    @property
    def board_sizes(self):
        rows_size, cols_size = self.selected_level.split("x")
        return int(rows_size), int(cols_size)

    @property
    def number_of_places(self):
        return reduce((lambda x, y: x * y), self.board_sizes)

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
    
    def __repr__(self) -> str:
        return f"<SquareItemModel: {self.adj_mines}, IsSelected: {self.is_selected}>"

