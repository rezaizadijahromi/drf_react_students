# Generated by Django 3.0.3 on 2021-02-23 10:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20210223_1259'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classroom',
            old_name='lesson_name',
            new_name='lesson',
        ),
    ]