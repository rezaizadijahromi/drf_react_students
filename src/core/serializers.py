from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# from users.models import User
from django.contrib.auth.models import User



from .models import (ClassRoom, Lesson, Master, Answer)



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value





class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)



class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson  
        fields = ( 
            'name',
        )

class MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = (
            'name',
        )


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            'description',
            'image', "slug",
        )

class ClassRoomSerializer(serializers.ModelSerializer):
    
    lesson = LessonSerializer()
    ostad = MasterSerializer()
    answers = AnswerSerializer(many=True)
    user = UserSerializerWithToken(many=False)

    class Meta:
        model = ClassRoom
        fields = (
            'id', 'user',
            'code','image',
            'ostad', 'lesson','answers',
            'slug', 'deadline', 'day'
        )
        read_only_fields = ('user',)
       

class DetailClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()
    user = UserSerializer(many=False)
    answers = AnswerSerializer(many=True)

    # ostad = serializers.PrimaryKeyRelatedField(queryset=Master.objects.all(), required=True)
    # lesson = serializers.PrimaryKeyRelatedField(queryset=Lesson.objects.all(), required=True)

    
    class Meta:
        model = ClassRoom
        fields = (
            'code','image', 'user',
            'ostad', 'lesson','answers',
            'slug', 'deadline', 'day'
        )

        read_only_fields = ('user',)


class CreateClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    # user = UserSerializer(many=False, required=False)

    class Meta:
        model = ClassRoom
        fields = (
            'code', 'user',
            'ostad', 'lesson',
            'image',
            'day',
        )
        extra_kwargs = {
            'user':{
                'read_only':True,
            }
        }
        read_only_fields = ('code', 'user')

class CreateAnswerSerializer(serializers.ModelSerializer):
    # username = UserSerializer(many=False, required=False)

    class Meta:
        model = Answer
        fields = (
            'description',
        )





    # ostad = serializers.StringRelatedField()
    # lesson = serializers.StringRelatedField()
    # ostad = serializers.PrimaryKeyRelatedField(queryset=Master.objects.all(), required=True)
    # lesson = serializers.PrimaryKeyRelatedField(queryset=Lesson.objects.all(), required=True)
    # def create(self, validated_data):
    #     room = ClassRoom.objects.create(
    #         ostad=validated_data['ostad'],
    #         lesson=validated_data['lesson'],
    #         day=validated_data['day']
    #     )

    #     return room

    # def create(self, validated_data):

    #     return get_user_model().objects.create_user(**validated_data)
        
    # def get_ostad(self, obj):
    #     return MasterSerializer(obj.name).data
    # def get_lesson(self, obj):
    #     return LessonSerializer(obj.lesson).data



        # def create(self, validated_data):
    #     room = ClassRoom.objects.create(
    #         ostad=validated_data['ostad'],
    #         lesson=validated_data['lesson'],
    #         day=validated_data['day']
    #     )

    #     return room

    
# class UserSerializerWithToken(UserSerializer):
#     token = serializers.SerializerMethodField()

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name', 'is_staff', 'is_active', 'token']

#     def get_token(self, obj):
#         token = RefreshToken.for_user(obj)
#         return str(token.access_token)

# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True)
#     user_name = serializers.CharField(required=True)
#     password = serializers.CharField(min_length=8, write_only=True)

#     class Meta:
#         model = User
#         fields = ('email', 'user_name', 'password')
#         extra_kwargs = {'password': {'write_only': True}}