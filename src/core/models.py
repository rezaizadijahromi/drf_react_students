from django.db import models
from django.db.models.signals import post_save, pre_save 

import string
import random
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, 
    PermissionsMixin
)
from django.core.exceptions import ValidationError



class UserManager(BaseUserManager):
    def creat_user(self, email, password=None, *args, **kwargs):
        if "gmail.com" not in email:
            raise ValidationError('gmail.com shold be in email')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.creat_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_admin(self):
        return self.is_admin

    def __str__(self):
        return str(self.email)
    

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


    def __str__(self):
        return str(self.code)


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

class Master(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name

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

    def __str__(self):
        return self.description

