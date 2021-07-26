from django.db.models import fields
from rest_framework import serializers

from core.api.v1.service import MineSweeperBuild
from core.models import BoardModel, RowModel, SquareItemModel



class SquareItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SquareItemModel
        fields = [
            "index", 
            "adj_mines", 
            "is_selected", 
            "is_mine", 
            "is_flaged", 
            "row",
            "board"
        ]


class RowSerializer(serializers.ModelSerializer):
    square_items = SquareItemSerializer(many=True, read_only=True)

    class Meta:
        model = RowModel
        fields = ["index", "board", "square_items"]


class BoardSerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField([0, 1, 2], required=True)
    rows = RowSerializer(many=True, read_only=True)

    class Meta:
        model = BoardModel
        fields = [
            "id",
            "level",
            "selected_level", 
            "end_game", 
            "is_winner", 
            "square_remaining",
            "rows"
            ]
        read_only_fields = ["selected_level", "end_game", "is_winner", "square_remaining"]
    
    def create(self, validated_data):
        board = MineSweeperBuild(
            level=validated_data["level"], 
            BoardModel=BoardModel,
            RowModel=RowModel,
            SquareItemModel=SquareItemModel)

        return board.board


class MineSweeperActionSerializer(serializers.Serializer):
    # This serializer gonna just verify the input values to update minesweeper
    row = serializers.IntegerField(required=True, write_only=True)
    col = serializers.IntegerField(required=True, write_only=True)
