from rest_framework import serializers

from .models import ClassRoom, Lesson


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson  
        fields = (
            'name',
        )

class ClassRoomSerializer(serializers.ModelSerializer):
    # lesson = serializers.SerializerMethodField()
    # lesson = serializers.CharField()
    lesson = LessonSerializer(read_only=True)

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
    lesson = LessonSerializer(read_only=True)
    
    class Meta:
        model = ClassRoom
        fields = (
            'code','image',
            'ostad', 'lesson',
            'slug', 'deadline', 'day'
        )

    # def get_lesson_name(self, obj):
    #     return LessonSerializer(obj.lesson_name).data

