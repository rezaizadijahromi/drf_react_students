from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password



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
        user = User.objects.create_user(
            first_name=request.data['first_name'],
            user_name=request.data['user_name'],
            email=request.data['email'],
            password=make_password(request.data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
        # except:
        #     message = {'detail': 'User with this email already exists'}
        #     return Response(message, status=status.HTTP_400_BAD_REQUEST)


