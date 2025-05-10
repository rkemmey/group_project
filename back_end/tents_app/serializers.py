from rest_framework import serializers
from .models import TentsPuzzle

class TentsPuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TentsPuzzle
        fields = '__all__'