# Generated by Django 3.0.3 on 2021-02-21 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210221_1911'),
    ]

    operations = [
        migrations.AddField(
            model_name='classroom',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='class/'),
        ),
    ]
