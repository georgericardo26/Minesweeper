from django.db.models import fields
from django.contrib.auth import get_user_model
from rest_framework import serializers

from core.api.v1.service import MineSweeperBuild
from core.models import BoardModel, RowModel, SquareItemModel


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "email",
            "first_name",
            "last_name"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):

        user = User(**validated_data)
        user.set_password(user.password)
        user.is_staff = True
        user.save()

        return user


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

    rows = RowSerializer(many=True, read_only=True)

    class Meta:
        model = BoardModel
        fields = [
            "id",
            "uuid",
            "rows_number",
            "cols_number",
            "mines_number",
            "selected_level", 
            "end_game",
            "is_winner", 
            "square_remaining",
            "created_at",
            "rows"
            ]
        read_only_fields = ["uuid", "selected_level", "end_game", "is_winner", "square_remaining", "created_at"]
        extra_kwargs = {
                "rows_number": {"required": True},
                "cols_number": {"required": True},
                "mines_number": {"required": True}
            }
    
    def create(self, validated_data):
        board = MineSweeperBuild(
            rows_number=validated_data["rows_number"], 
            cols_number=validated_data["cols_number"], 
            mines_number=validated_data["mines_number"], 
            BoardModel=BoardModel,
            RowModel=RowModel,
            SquareItemModel=SquareItemModel)

        return board.board


class MineSweeperActionSerializer(serializers.Serializer):
    # This serializer gonna just verify the input values to update minesweeper
    row = serializers.IntegerField(required=True, write_only=True)
    col = serializers.IntegerField(required=True, write_only=True)
