from django.shortcuts import render
from django.http import JsonResponse

# Django rest framework
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Files
from .models import ClassRoom, Master, Lesson
from .serializers import (
    ClassRoomSerializer, DetailClassRoomSerializer,
    CreateClassRoomSerializer, MasterSerializer,
    LessonSerializer
)


class ClassRoomView(generics.ListAPIView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer

class MasterView(generics.ListAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer

class LessonView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class DetailClassRoomView(APIView):
    serializer_class = DetailClassRoomSerializer,
    loohup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.loohup_url_kwarg)
        class_room = ClassRoom.objects.filter(
            code=code
        )
        if class_room.exists():
            room = class_room.first()
            data = DetailClassRoomSerializer(room).data
            return Response(data,
            status=status.HTTP_200_OK)
        else:
            return Response(
                {'message':'Invalid class'}, status=status.HTTP_400_BAD_REQUEST
            )

# class CreateClassRoomView(generics.CreateAPIView):
#     serializer_class = CreateClassRoomSerializer   


#     def perform_create(self, serializer):
#         serializer = self.serializer_class(data=self.request.data)
#         if serializer.is_valid():
#             print(serializer)
#             ostad = serializer.data['ostad']['name']
#             lesson = serializer.data['lesson']['name']
#             day = serializer.data.get('day')

#             lesson_obj = Lesson.objects.get(name=lesson)
#             master_obj = Master.objects.get(name=ostad)



#             room = ClassRoom.objects.create(
#                 ostad=master_obj,
#                 lesson=lesson_obj,
#                 day=day
#             )
#             room.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(
#                 {
#                     'message': "This is problem"
#                 },
#                 status=status.HTTP_400_BAD_REQUEST
#             )

class CreateClassRoomView(APIView):
    serializer_class = CreateClassRoomSerializer


    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            ostad = request.data['ostad.name']
            lesson = request.data['lesson.name']
            day = request.data.get('day')

            lesson_obj = Lesson.objects.get(name=lesson)
            master_obj = Master.objects.get(name=ostad)



            room = ClassRoom.objects.create(
                ostad=master_obj,
                lesson=lesson_obj,
                day=day
            )
            room.save()
            return Response(CreateClassRoomSerializer(room).data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {
                    'message': "This is problem"
                },
                status=status.HTTP_400_BAD_REQUEST
            )



# class BookList(generics.ListAPIView):
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer

# class CreateBookView(APIView):
#     serializer_class = BookSerializer

#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             name = request.data.get('name')
#             # author = serializer.data.get('author')
#             description = request.data.get('description')
#             book = Book.objects.create(
#                 name=name,
#                 description=description
#             )

#             book.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)

# class DeleteBookView(APIView):
#     lookup_url_kwarg = "pk"
#     def delete(self, request, pk, format=None):
#         # pk = request.GET.get(self.lookup_url_kwarg)
#         book = Book.objects.get(id=pk)
#         book.delete()

#         return Response(
#             {
#                 "message": "Item delete successfully"
#             },
#             status=status.HTTP_204_NO_CONTENT
#         )

# @api_view(['DELETE'])
# def taskDelete(request, pk):
# 	task = Book.objects.get(id=pk)
# 	task.delete()

# 	return Response('Item succsesfully delete!')



