# Generated by Django 3.0.3 on 2021-02-26 17:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20210226_2050'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='image_answer',
            new_name='image',
        ),
    ]
