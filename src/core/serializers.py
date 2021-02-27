from rest_framework import serializers

from .models import (ClassRoom, Lesson, Master, Answer)



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

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


class ClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()

    class Meta:
        model = ClassRoom
        fields = (
            'id',
            'code','image',
            'ostad', 'lesson','answers',
            'slug', 'deadline', 'day'
        )

       

class DetailClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()
    # ostad = serializers.PrimaryKeyRelatedField(queryset=Master.objects.all(), required=True)
    # lesson = serializers.PrimaryKeyRelatedField(queryset=Lesson.objects.all(), required=True)

    
    class Meta:
        model = ClassRoom
        fields = (
            'code','image',
            'ostad', 'lesson','answers',
            'slug', 'deadline', 'day'
        )

class CreateClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()


    class Meta:
        model = ClassRoom
        fields = (
            'code', 
            'ostad', 'lesson',
            'image',
            'day',
        )
        read_only_fields = ('code',)


    # def create(self, validated_data):
    #     room = ClassRoom.objects.create(
    #         ostad=validated_data['ostad'],
    #         lesson=validated_data['lesson'],
    #         day=validated_data['day']
    #     )

    #     return room

    

class CreateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = (
            'description', 'image',
        )


        def create(self, validated_data):
            answer = Answer.objects.create(
                description=validated_data['description'],
                image=validated_data['image'],
            )

            return answer



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