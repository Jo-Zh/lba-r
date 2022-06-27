# Generated by Django 4.0.5 on 2022-06-27 09:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_posts_creater_remove_posts_reader'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='creater',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
