import os
from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    def generate_superuser(apps, schema_editor):
        from django.contrib.auth import get_user_model

        User = get_user_model()

        DJANGO_SU_NAME = os.environ.get('DJANGO_SU_NAME')
        DJANGO_SU_EMAIL = os.environ.get('DJANGO_SU_EMAIL')
        DJANGO_SU_PASSWORD = os.environ.get('DJANGO_SU_PASSWORD')

        if not User.objects.filter(username=DJANGO_SU_NAME).exists():
            superuser = User.objects.create_superuser(
                username=DJANGO_SU_NAME,
                email=DJANGO_SU_EMAIL,
                password=DJANGO_SU_PASSWORD)

            superuser.save()

    operations = [
        migrations.RunPython(generate_superuser),
    ]