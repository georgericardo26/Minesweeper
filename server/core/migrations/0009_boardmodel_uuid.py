# Generated by Django 3.2.5 on 2021-07-27 01:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20210727_0106'),
    ]

    operations = [
        migrations.AddField(
            model_name='boardmodel',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]