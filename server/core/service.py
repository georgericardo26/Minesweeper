"""
Package: core
Module : service.py
Author : George Ricardo

This module has been created to handle query objects using business logics and returns result to view.
"""

class MineSweeperService:
    # The Main service of game.

    __slots__ = ("board", "row", "square_item")

    def __init__(self, BoardModel: "BoardModel", RowModel: "RowModel", SquareItemModel: "SquareItemModel") -> None:
        pass

    def __create_grid(self) -> None:
        pass

    def __create_mines(self) -> None:
        pass

    def __check_valid_place(self, row: int, col: int) -> bool:
        pass

    def __check_is_mine(self, row: int, col: int) -> bool:
        pass

    def __check_is_selected(self, row: int, col: int) -> bool:
        pass

    def make_move(self, row: int, col: int) -> None:
        pass

    def make_depth_move(self, row: int, col: int) -> bool:
        pass

    def show_mines(self) -> None:
        pass

    def check_is_winner(self) -> None:
        pass