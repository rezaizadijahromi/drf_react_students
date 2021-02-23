from django.db import models
from django.db.models.signals import post_save, pre_save 

import string
import random
from datetime import datetime, timedelta

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if ClassRoom.objects.filter(code=code).count() == 0:
            break
    return code
    


class ClassRoom(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    image = models.ImageField(
        blank=True, null=True,
        
    )
    ostad = models.CharField(max_length=100)
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE, default="reza")
    slug = models.SlugField(blank=True, null=True)
    day = models.IntegerField(default=0)
    date = models.DateTimeField(default=datetime.today)
    deadline = models.DateTimeField(default=datetime.today)


    def __str__(self):
        return self.code


def pre_save_slug_ref_code(sender, instance, *args, **kwargs):
    # if not created:
    instance.slug = instance.code
    if not instance.code:
        day = instance.day
        time = timedelta(days=day)
        deadline = instance.date + time
        instance.deadline = deadline
        

pre_save.connect(pre_save_slug_ref_code, sender=ClassRoom)


class Lesson(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name