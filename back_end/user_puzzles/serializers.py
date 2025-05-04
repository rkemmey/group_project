from rest_framework import serializers
from .models import PuzzleProgress

class PuzzleProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuzzleProgress
        fields = ['id', 'user', 'content_type', 'object_id', 'progress', 'is_completed', 'last_updated']
        read_only_fields = ['user', 'last_updated']
