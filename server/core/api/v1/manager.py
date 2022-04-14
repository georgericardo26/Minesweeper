"""
Package: core
Module : manager.py
Author : George Ricardo

This module has been created to handle query objects using business logics and returns result to view.
"""
import random

from django.db.models import F


class MineSweeperBuild:
    # The Main game's creations service.

    __slots__ = ("board", "row_model", "square_model", "rows_obj", "square_item")

    def __init__(self, rows_number: int, cols_number:int, mines_number:int, BoardModel: "BoardModel", RowModel: "RowModel", SquareItemModel: "SquareItemModel") -> None:
        self.row_model = RowModel
        self.square_model = SquareItemModel

        # Performs methods to create board, rows and squires
        self.__create_board(rows_number, cols_number, mines_number, BoardModel)
        self.__create_rows(RowModel)
        self.__create_square_item(SquareItemModel)
        self.__create_mines()
        self.__create_remaining_places()

    def __create_board(self, rows_number: int, cols_number:int, mines_number:int, BoardModel: "BoardModel") -> None:
        self.board = BoardModel.objects.create(rows_number=rows_number, cols_number=cols_number, mines_number=mines_number)

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
                    row=row_obj,
                    board=self.board
                ) for index, _ in enumerate(range(cols_size))
            ])
    
    def __create_mines(self) -> None:
        rows_size, cols_size = self.board.board_sizes
        number_of_places = self.board.number_of_places

        number_of_mines = self.board.mines_number
        mines_inserted = 0

        while mines_inserted <= number_of_mines:
            row = random.randint(0, rows_size - 1)
            col = random.randint(0, cols_size - 1)
            
            square_obj = self.square_model.objects.filter(index=col, row__index=row, board__id=self.board.id).first()

            if square_obj and not square_obj.is_mine:
                self.__add_mine(square_obj)
                self.__add_adj_values(square_obj, row, col)
                mines_inserted += 1
    
    def __add_mine(self, square_obj: "SquareItemModel") -> None:
        square_obj.is_mine = True
        square_obj.adj_mines = -1
        square_obj.save()

    def __add_adj_values(self, square_obj: "SquareItemModel", row: int, col: int) -> None:
        # Method to add +1 to adjacent fields

        for row_item in range(row-1, row+2):
            square_obj_col_left = self.square_model.objects.filter(index=(col - 1), row__index=row_item, board__id=self.board.id).first()
            square_obj_col_right = self.square_model.objects.filter(index=(col + 1), row__index=row_item, board__id=self.board.id).first()
            
            #check the left place
            if square_obj_col_left and not square_obj_col_left.is_mine:
                square_obj_col_left.adj_mines = F('adj_mines') + 1
                square_obj_col_left.save()

             #check the right place
            if square_obj_col_right and not square_obj_col_right.is_mine:
                square_obj_col_right.adj_mines = F('adj_mines') + 1
                square_obj_col_right.save()

        #check the top place
        square_obj_row_top = self.square_model.objects.filter(index=col, row__index=(row + 1), board__id=self.board.id).first()
        
        #check the bottom place
        square_obj_row_bottom = self.square_model.objects.filter(index=col, row__index=(row - 1), board__id=self.board.id).first()

        if square_obj_row_top and not square_obj_row_top.is_mine:
            square_obj_row_top.adj_mines = F('adj_mines') + 1
            square_obj_row_top.save()
        
        if square_obj_row_bottom and not square_obj_row_bottom.is_mine:
            square_obj_row_bottom.adj_mines = F('adj_mines') + 1
            square_obj_row_bottom.save()

    def __create_remaining_places(self):
        self.board.square_remaining = self.board.number_of_places
        self.board.save()              

class MineSweeperAction:
    # The Main game's actions service.

    __slots__ = ("board", "row_model", "square_model")

    def __init__(self, board_object: "BoardModel", RowModel: "RowModel", SquareItemModel: "SquareItemModel") -> None:
        self.board = board_object
        self.row_model = RowModel
        self.square_model = SquareItemModel

    def __check_valid_place(self, row: int, col: int) -> bool:
        pass

    def __check_is_mine(self, row: int, col: int) -> bool:
        square_obj = self.square_model.objects.filter(index=col, row__index=row, board__id=self.board.id).first()

        if square_obj:
            return square_obj.is_mine
        return False

    def make_move(self, row: int, col: int) -> "BoardModel":

        #Check if it is expired
        if self.board.is_expired:
            #Select all squires because the game is over
            return self.update_board_expired_time()
        
        if self.board.end_game:
            return self.board

        #If it is mine, select all mines and game over.
        if self.__check_is_mine(row, col):
            self.__update_mines()
            self.board.end_game = True
            self.board.is_winner = False
            self.board.save()
            return self.board

        #If it isn't mine, check its value    
        self.__make_depth_move(row, col)

        #Update the remaining
        self.__update_remaining()
        
        return self.board

    def update_board_expired_time(self) -> "BoardModel":
        #Select all squires because the game is over
        self.square_model.objects.all().update(is_selected=True) 
        self.board.end_game = True
        self.board.save()
        return self.board
        

    def __make_depth_move(self, row: int, col: int) -> bool:

        square_obj = self.square_model.objects.filter(
            index=col, 
            row__index=row, 
            board__id=self.board.id).first()

        if square_obj and not square_obj.is_selected:

            square_obj.is_selected = True
            square_obj.save()

            if square_obj.is_mine:
                return

            if square_obj.adj_mines == 0:
                for row_item in range(row-1, row+2):

                    square_obj_col_left = self.square_model.objects.filter(index=(col - 1), row__index=row_item, board__id=self.board.id).first()
                    square_obj_col_right = self.square_model.objects.filter(index=(col + 1), row__index=row_item, board__id=self.board.id).first()

                    #check the left place
                    if square_obj_col_left and not square_obj_col_left.is_selected:
                        self.__make_depth_move(row_item, col - 1)

                    #check the right place
                    if square_obj_col_right and not square_obj_col_right.is_selected:
                        self.__make_depth_move(row_item, col + 1)
                
                #check the top place
                square_obj_row_top = self.square_model.objects.filter(index=col, row__index=(row + 1), board__id=self.board.id).first()
                
                #check the bottom place
                square_obj_row_bottom = self.square_model.objects.filter(index=col, row__index=(row - 1), board__id=self.board.id).first()

                if square_obj_row_top and not square_obj_row_top.is_selected:
                    self.__make_depth_move(row - 1, col)
                
                if square_obj_row_bottom and not square_obj_row_bottom.is_mine:
                    self.__make_depth_move(row + 1, col)
                
            return

        return

    def __update_mines(self) -> None:
        self.square_model.objects.filter(
            is_mine=True, 
            board__id=self.board.id).update(is_selected=True) 

    def __update_remaining(self) -> None:
        remaining_items = self.board.square_items.filter(is_selected=False).count()
        self.board.square_remaining = remaining_items
        self.board.save()

    def set_or_remove_flag(self, row: int, col: int) -> "BoardModel":
        square_obj = self.square_model.objects.filter(
            index=col, 
            row__index=row, 
            board__id=self.board.id).first()
        
        if square_obj:
            if square_obj.is_flaged:
                square_obj.is_flaged = False
            else:
                square_obj.is_flaged = True
            
            square_obj.save()
        
        return self.board
