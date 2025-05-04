from rest_framework import serializers
from .models import ImagePixels, NonogramPuzzle

class ImagePixelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePixels
        fields = ['id', 'source_url', 'pixels', 'created_at']

class NonogramPuzzleSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()
    class Meta:
        model = NonogramPuzzle
        fields = '__all__'
    def get_size(self, obj):
        return (obj.rows, obj.cols)