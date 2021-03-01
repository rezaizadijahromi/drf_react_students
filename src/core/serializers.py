from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


from .models import (ClassRoom, Lesson, Master, Answer, User)



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ('email' , 'password', 'username', 'is_active', 'is_staff')
        extra_kwargs = {
            'password':{
                'min_length':5
            }
        }
        read_only_fields = ('email', 'password', 'username', 'is_active', 'is_staff')

    def create(self, validated_data):
        """Create a new user with encrypted password and return it """
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


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
        )

class ClassRoomSerializer(serializers.ModelSerializer):
    
    lesson = LessonSerializer()
    ostad = MasterSerializer()
    answers = AnswerSerializer(many=True)
    user = UserSerializer(many=False)

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
    user = UserSerializer(many=False, required=False)

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
    username = UserSerializer(many=False, required=False)

    class Meta:
        model = Answer
        fields = (
            'description', 'username'
        )
        read_only_fields = ('username',)





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

    