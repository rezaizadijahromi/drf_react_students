from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework import generics, status, permissions, authentication
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterUser(APIView):
    def post(self, request, format=None):
        print(request.data)
        user = User.objects.create(
            email=request.data['email'],
            username=request.data['user_name'],
            first_name=request.data['user_name'],
            password=make_password(request.data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def GetUsersView(request):
    users = User.objects.all()
    serializer = UserSerializerWithToken(users, many=True)
    return Response(serializer.data)