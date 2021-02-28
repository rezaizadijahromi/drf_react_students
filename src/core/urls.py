from django.contrib import admin
from django.urls import path

from . import views

app_name = 'core'


urlpatterns = [
    path('', views.ClassRoomView.as_view()),
    path('master/', views.MasterView.as_view()),
    path('create-master/', views.CreateMasterView.as_view()),
    path('lesson/', views.LessonView.as_view()),
    path('create-lesson/', views.CreateLessonView.as_view()),
    path('class/<code>/', views.DetailClassRoomView.as_view()),
    path('class/<code>/answer/', views.CreateAnswerView.as_view()),
    path('create-class/', views.CreateClassRoomView.as_view()),
]


# from .views import (
#     BookList, CreateBookView,
#     DeleteBookView, taskDelete
# )

# urlpatterns = [
#     path('list/', BookList.as_view()),
#     path('create-book/', CreateBookView.as_view()),
#     # path('delete-book/<str:pk>/', DeleteBookView.as_view()),
#     path('delete-book/<int:pk>/', taskDelete, name="task-delete"),

# ]
