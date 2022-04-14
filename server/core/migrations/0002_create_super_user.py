import os
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    def generate_superuser(apps, schema_editor):
        from django.contrib.auth import get_user_model

        User = get_user_model()

        DJANGO_DEFAULT_USERNAME = os.environ.get('DJANGO_DEFAULT_USERNAME')
        DJANGO_DEFAULT_EMAIL = os.environ.get('DJANGO_DEFAULT_EMAIL')
        DJANGO_DEFAULT_PASSWORD = os.environ.get('DJANGO_DEFAULT_PASSWORD')

        if not User.objects.filter(username=DJANGO_DEFAULT_USERNAME).exists():
            superuser = User.objects.create_superuser(
                username=DJANGO_DEFAULT_USERNAME,
                email=DJANGO_DEFAULT_EMAIL,
                password=DJANGO_DEFAULT_PASSWORD)

            superuser.save()

    operations = [
        migrations.RunPython(generate_superuser),
    ]