# Generated by Django 3.2.5 on 2021-07-25 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_squareitemmodel_board'),
    ]

    operations = [
        migrations.AddField(
            model_name='boardmodel',
            name='square_remaining',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]