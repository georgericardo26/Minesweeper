from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed, ValidationError

from core.models import BoardModel, RowModel, SquareItemModel
from core.api.v1.serializers import BoardSerializer, MineSweeperActionSerializer
from core.api.v1.service import MineSweeperAction


class MineSweeperCreateView(generics.CreateAPIView):
    queryset = BoardModel.objects.all()
    serializer_class = BoardSerializer


class MineSweeperRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = BoardModel.objects.all()
    serializer_class = MineSweeperActionSerializer

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