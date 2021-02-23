from rest_framework import serializers

from .models import (ClassRoom, Lesson, Master)


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

