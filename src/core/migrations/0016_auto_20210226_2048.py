# Generated by Django 3.0.3 on 2021-02-26 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_classroom_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='image_answer',
            field=models.ImageField(blank=True, null=True, upload_to='answrs/'),
        ),
    ]
