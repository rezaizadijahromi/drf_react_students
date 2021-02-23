from rest_framework import serializers

from .models import (ClassRoom, Lesson, Master)



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
            'code','image',
            'ostad', 'lesson',
            'slug', 'deadline', 'day'
        )

        # def get_lesson(self, obj):
        #     return LessonSerializer(obj.lesson).data

class DetailClassRoomSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()
    ostad = MasterSerializer()

    
    class Meta:
        model = ClassRoom
        fields = (
            'code','image',
            'ostad', 'lesson',
            'slug', 'deadline', 'day'
        )

class CreateClassRoomSerializer(serializers.ModelSerializer):
    # lesson = LessonSerializer()
    # ostad = MasterSerializer()

    class Meta:
        model = ClassRoom
        fields = (
            'code',
            'ostad', 'lesson',
            'image', 'day',
        )
        read_only_fields = (
            'code',
        ) 
    def create(self, validated_data):
        room = ClassRoom.objects.create(
            ostad=validated_data['ostad'],
            lesson=validated_data['lesson'],
            image=validated_data['image'],
            day=validated_data['day']
        )

        return room

        
    # def get_ostad(self, obj):
    #     return MasterSerializer(obj.name).data
    # def get_lesson(self, obj):
    #     return LessonSerializer(obj.lesson).data