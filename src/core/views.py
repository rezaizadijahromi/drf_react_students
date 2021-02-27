from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import (
    render, redirect,
    get_object_or_404
)

# Django rest framework
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser

# Files
from .models import ClassRoom, Master, Lesson, Answer
from .serializers import (
    ClassRoomSerializer, DetailClassRoomSerializer,
    CreateClassRoomSerializer, MasterSerializer,
    LessonSerializer, CreateAnswerSerializer
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

    def get(self, request, code, format=None):
        # code = request.GET.get(self.loohup_url_kwarg)
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



class CreateClassRoomView(APIView):
    serializer_class = CreateClassRoomSerializer


    def post(self, request, format=None):
        parser_classes = [MultiPartParser, FormParser]
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        print(request.data)

        if serializer.is_valid():
            ostad = serializer.data.get('ostad')
            lesson = serializer.data.get('lesson')
            image = serializer.FILES['image']
            day = serializer.data.get('day')


            print('---lesson---')
            print('---lesson---')
            print(lesson)
            print(ostad)
            # print(image)
            print('---lesson---')
            print('---lesson---')
            master_obj = Master.objects.get(name=ostad['name'])
            lesson_obj = Lesson.objects.get(name=lesson['name'])

            room = ClassRoom.objects.create(
                ostad=master_obj,
                lesson=lesson_obj,
                image=image,
                day=day
            )
            room.save()
            return Response(CreateClassRoomSerializer(room).data, status=status.HTTP_201_CREATED)
        else:
            print("Problem")
            return Response(
                {
                    'message': "This is problem"
                },
                status=status.HTTP_404_NOT_FOUND
            )

class CreateAnswerView(APIView):

    serializer_class = CreateAnswerSerializer
    loohup_url_kwarg = 'code'

    def post(self, request, code, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            # code = request.GET.get(self.loohup_url_kwarg)
            room = get_object_or_404(ClassRoom, code=code)
            image = request.data['image']
            description = serializer.data.get('description')
            answer = Answer.objects.create(
                image=image,
                description=description,
                question=room
            )
            answer.save()
            room.answers.add(answer)
            room.save()

            return Response(CreateAnswerSerializer(answer).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'error'}, status=status.HTTP_404_NOT_FOUND)

class CreateLessonView(APIView):
    serializer_class = LessonSerializer

    def get(self, request, format=None):
        queryset = Lesson.objects.all()
        serializer = LessonSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():

            lesson = Lesson.objects.create(
                name=serializer.data.get('name')
            )

            lesson.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'there is an error'}, status=status.HTTP_400_BAD_REQUEST)


class CreateMasterView(APIView):
    serializer_class = MasterSerializer

    def get(self, request, format=None):
        queryset = Master.objects.all()
        serializer = MasterSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)

        if serializer.is_valid():

            master = Master.objects.create(
                name=serializer.data.get('name')
            )

            master.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'there is an error'}, status=status.HTTP_404_NOT_FOUND)


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



