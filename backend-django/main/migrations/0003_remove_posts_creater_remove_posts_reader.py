# Generated by Django 4.0.5 on 2022-06-27 06:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_user_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='posts',
            name='creater',
        ),
        migrations.RemoveField(
            model_name='posts',
            name='reader',
        ),
    ]
