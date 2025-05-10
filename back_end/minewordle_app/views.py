from django.shortcuts import render
from django.http import JsonResponse
from django.db.models.functions import Random
from .models import Word

# Create your views here.
def get_random_word(request):
    if request.method == 'GET':
        word = Word.objects.order_by(Random()).first()  # Querying the 'words' table
        if word:
            return JsonResponse({'word': word.word})
        return JsonResponse({'error': 'No words in database'}, status=404)



