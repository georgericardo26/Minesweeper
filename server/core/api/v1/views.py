"""
Package: core
Module : views.py
Author : George Ricardo

This module has been created to handle request and return a response.
"""
from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed, ValidationError

from core.models import BoardModel, RowModel, SquareItemModel, User
from core.api.v1.serializers import BoardSerializer, MineSweeperActionSerializer, UserSerializer
from core.api.v1.service import MineSweeperAction
from core.api.v1.permissions import MineSweeperUpdatePermission


class UserCreateView(generics.CreateAPIView):
    #View to create a new user
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    #View to retrieve and update a user
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class MineSweeperCreateView(generics.CreateAPIView):
    #View to create the board
    queryset = BoardModel.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]


class MineSweeperRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    #View to make move from an alread created board
    queryset = BoardModel.objects.all()
    serializer_class = MineSweeperActionSerializer
    permission_classes = [permissions.IsAuthenticated, MineSweeperUpdatePermission]

    def update(self, request, *args, **kwargs):
        serializer_input = self.serializer_class(data=request.data)
        if serializer_input.is_valid():
            board_obj = self.get_object()
            mine_sweeper_action = MineSweeperAction(board_obj, RowModel, SquareItemModel)
            board_instance = mine_sweeper_action.make_move(
                row=request.data["row"], 
                col=request.data["col"])

            serializer_board = BoardSerializer(instance=board_instance)

            return Response(data=serializer_board.data, status=200)
        
        raise ValidationError(detail="Body request invalid, are allowed just the fields `row` and `col`")

    def partial_update(self, request, *args, **kwargs):
        raise MethodNotAllowed("PATCH", detail="Use PUT instead")

class MineSweeperSquareItemModelFlagUpdateView(generics.UpdateAPIView):
    #View to add or remove flag to/from square item
    queryset = BoardModel.objects.all()
    serializer_class = MineSweeperActionSerializer
    permission_classes = [permissions.IsAuthenticated, MineSweeperUpdatePermission]

    def update(self, request, *args, **kwargs):
        serializer_input = self.serializer_class(data=request.data)
        if serializer_input.is_valid():
            board_obj = self.get_object()
            mine_sweeper_action = MineSweeperAction(board_obj, RowModel, SquareItemModel)

            board_instance = mine_sweeper_action.set_or_remove_flag(
                row=request.data["row"], 
                col=request.data["col"])

            serializer_board = BoardSerializer(instance=board_instance)

            return Response(data=serializer_board.data, status=200)

        raise ValidationError(detail="Body request invalid, are allowed just the fields `row` and `col`")

    def partial_update(self, request, *args, **kwargs):
        raise MethodNotAllowed("PATCH", detail="Use PUT instead")