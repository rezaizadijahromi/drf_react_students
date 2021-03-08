from django.db import models
from django.db.models.signals import post_save, pre_save 

import string
import random
from datetime import datetime, timedelta, timezone
from django.contrib.auth import get_user_model
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, 
    PermissionsMixin
)
from django.core.exceptions import ValidationError
from django.utils.text import slugify

from django.conf import settings
# from users.models import User
from django.contrib.auth.models import User


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if ClassRoom.objects.filter(code=code).count() == 0:
            break
    return code
    


class ClassRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    image = models.ImageField(
        blank=True, null=True,
        upload_to="classes/"
        
    )
    ostad = models.ForeignKey('Master', on_delete=models.CASCADE, default="reza")
    lesson = models.ForeignKey('Lesson', on_delete=models.CASCADE, default="reza")
    slug = models.SlugField(blank=True, null=True)
    answers = models.ManyToManyField(
        'Answer',related_name='answered',
        blank=True
    )

    user_answer = models.ManyToManyField(
        User,related_name="user_answer",
        blank=True
    )
    day = models.IntegerField(default=0)
    date = models.DateTimeField(default=datetime.today)
    deadline = models.DateTimeField(default=datetime.today)

    def get_time_left(self):
        left_time = (self.deadline - datetime.now(timezone.utc)).days
        if left_time > 0:
            return left_time
        else:
            return " Your time for answering this question is over"



    def __str__(self):
        return str(self.code)


def pre_save_slug_ref_code(sender, instance, *args, **kwargs):
    # if not created:
    instance.slug = instance.code
    if instance.code:
        day = int(instance.day)
        time = timedelta(days=day)
        deadline = instance.date + time
        instance.deadline = deadline
        print("running")
        

pre_save.connect(pre_save_slug_ref_code, sender=ClassRoom)


class Lesson(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class Master(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

class AnswerManager(models.Manager):
    def toggle_like(self, user, answer_obj):
        if user in answer_obj.liked.all():
            is_liked = False
            answer_obj.liked.remove(user)
        else:
            is_liked = True
            answer_obj.liked.add(user)

        return is_liked



class Answer(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE,  blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(blank=True, null=True,
        upload_to="answers/")
    question = models.ForeignKey('ClassRoom', on_delete=models.CASCADE)
    liked = models.ManyToManyField(
        User, related_name='liked',
        blank=True
    )
    slug = models.SlugField(blank=True, null=True)

    objects = AnswerManager()


    def __str__(self):
        return self.description

    def save(self,*args, **kwargs):
        if not self.slug and self.description:
            self.slug = slugify(self.description)
        super(Answer,self).save(*args, **kwargs)