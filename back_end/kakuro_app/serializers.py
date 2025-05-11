# kakuro_app/serializers.py
from rest_framework import serializers
from .models import KakuroPuzzle

class KakuroPuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = KakuroPuzzle
        fields = '__all__'