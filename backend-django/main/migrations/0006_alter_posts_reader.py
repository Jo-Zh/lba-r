# Generated by Django 4.0.5 on 2022-07-02 09:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_posts_reader_alter_comments_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='reader',
            field=models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]