# Generated by Django 5.2 on 2025-04-14 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='display_name',
            field=models.CharField(default='unknown', max_length=50),
        ),
    ]
