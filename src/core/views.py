from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import (
    render, redirect,
    get_object_or_404
)

# Django rest framework
from rest_framework import generics, status, permissions, authentication
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser

# Files
from .models import ClassRoom, Master, Lesson, Answer
# from users.models import User
from django.contrib.auth.models import User

from .serializers import (
    ClassRoomSerializer, DetailClassRoomSerializer,
    CreateClassRoomSerializer, MasterSerializer,
    LessonSerializer, CreateAnswerSerializer, UserSerializer
)
class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticate user"""
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user



class ClassRoomView(generics.ListAPIView):
    
    # authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = ClassRoomSerializer
    queryset = ClassRoom.objects.all()
    

class MasterView(generics.ListAPIView):
    queryset = Master.objects.all()
    # authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MasterSerializer

class LessonView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    # authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LessonSerializer

class DetailClassRoomView(APIView):
    serializer_class = DetailClassRoomSerializer
    # authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
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
    # authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        parser_classes = [MultiPartParser, FormParser]
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        print("request")
        print(request.data['lesson'])
        print(request.user.username)
        # if serializer.is_valid():
            
        user = request.user.username
        ostad = request.data.get('master')
        lesson = request.data.get('lesson')
        image = request.FILES.get('image')
        day = request.data.get('day')


        print('---lesson---')
        print('---lesson---')
        print(lesson)
        print(image)
        print(user)
        print('---lesson---')
        print('---lesson---')
        master_obj = Master.objects.get(name=ostad)
        lesson_obj = Lesson.objects.get(name=lesson)
        user_obj = User.objects.get(username=user)

        room = ClassRoom.objects.create(
            user=user_obj,
            ostad=master_obj,
            lesson=lesson_obj,
            image=image,
            day=day
        )
        room.save()
        return Response(CreateClassRoomSerializer(room).data, status=status.HTTP_201_CREATED)
        # if serializer.is_valid():
        # else:
        #     print(serializer.errors)
        #     return Response(
        #         {
        #             'message': "This is problem"
        #         },
        #         status=status.HTTP_404_NOT_FOUND
        #     )

class CreateAnswerView(APIView):
    serializer_class = CreateAnswerSerializer
    permission_classes = (permissions.IsAuthenticated,)
    loohup_url_kwarg = 'code'

    def post(self, request, code, format=None):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            # code = request.GET.get(self.loohup_url_kwarg)
            user = request.user.email
            room = get_object_or_404(ClassRoom, code=code)
            user_obj = User.objects.get(email=user)
            description = serializer.data.get('description')

            if user_obj in room.user_answer.all() or room.answers.all():
                return Response({"message": "you already answer to this room"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                answer = Answer.objects.create(
                    # image=image,
                    username=user_obj,
                    description=description,
                    question=room
                )
                answer.save()
                room.answers.add(answer)
                room.save()

            return Response(CreateAnswerSerializer(answer).data, status=status.HTTP_201_CREATED)
        else:
            print("problem")
            return Response({'message':'error'}, status=status.HTTP_404_NOT_FOUND)

class CreateLessonView(APIView):
    serializer_class = LessonSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        queryset = Lesson.objects.all()
        serializer = LessonSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        print(serializer)
        print(request.data)
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
    permission_classes = (permissions.IsAuthenticated,)

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



