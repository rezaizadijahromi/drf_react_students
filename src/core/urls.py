from django.contrib import admin
from django.urls import path

from . import views

app_name = 'core'


urlpatterns = [
    path('', views.ClassRoomView.as_view()),
    path('class/', views.DetailClassRoomView.as_view()),
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
