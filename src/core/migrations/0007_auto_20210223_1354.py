# Generated by Django 3.0.3 on 2021-02-23 10:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210223_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroom',
            name='lesson',
            field=models.ForeignKey(default='reza', on_delete=django.db.models.deletion.CASCADE, to='core.Lesson'),
        ),
    ]
