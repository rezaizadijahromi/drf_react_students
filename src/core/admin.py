from django.contrib import admin
from .models import ClassRoom, Lesson, Master, Answer, User


admin.site.register(User)
admin.site.register(ClassRoom)
admin.site.register(Lesson)
admin.site.register(Master)
admin.site.register(Answer)