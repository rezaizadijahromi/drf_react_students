# Generated by Django 3.0.3 on 2021-02-23 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_master'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classroom',
            name='ostad',
            field=models.ForeignKey(default='reza', on_delete=django.db.models.deletion.CASCADE, to='core.Master'),
        ),
    ]