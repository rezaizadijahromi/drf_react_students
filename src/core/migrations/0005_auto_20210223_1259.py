# Generated by Django 3.0.3 on 2021-02-23 09:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20210222_2119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.AlterField(
            model_name='classroom',
            name='lesson_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Lesson'),
        ),
    ]
