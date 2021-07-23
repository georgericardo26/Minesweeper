"""
Package: core
Module : service.py
Author : George Ricardo

This module has been created to handle query objects using business logics and returns result to view.
"""

class MineSweeperCreate:
    # The Main game's creations service.

    __slots__ = ("board", "row", "rows_obj", "square_item")

    def __init__(self, level: int, BoardModel: "BoardModel", RowModel: "RowModel", SquareItemModel: "SquareItemModel") -> None:
        self.__create_board(level, BoardModel)
        self.__create_rows(RowModel)
        self.__create_square_item(SquareItemModel)

    def __create_board(self, level: int, BoardModel: "BoardModel") -> None:
        self.board = BoardModel.objects.create(level=level)

    def __create_rows(self, RowModel):
        rows_size, cols_size = self.board.board_sizes
        self.rows_obj = RowModel.objects.bulk_create([
            RowModel(
                index=index,
                board=self.board
            ) for index, _ in enumerate(range(rows_size))
        ])
    
    def __create_square_item(self, SquareItemModel):
        rows_size, cols_size = self.board.board_sizes
        for row_obj in self.rows_obj:
            SquareItemModel.objects.bulk_create([
                SquareItemModel(
                    index=index,
                    row=row_obj
                ) for index, _ in enumerate(range(cols_size))
            ])
    
    def __create_mines(self) -> None:
        pass

class MineSweeperAction:
    # The Main game's actions service.

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