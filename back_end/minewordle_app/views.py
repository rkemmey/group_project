# views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.db.models.functions import Random
from .models import Word
from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from .models import Score
from .serializers import ScoreSerializer


# Create your views here.
def get_random_word(request):
    if request.method == 'GET':
         # Querying the 'words' table
        word = Word.objects.order_by(Random()).first()
        if word:
            return JsonResponse({'word': word.word})
        return JsonResponse({'error': 'No words in database'}, status=404)
    

"""
1. login post request: http://127.0.0.1:8000/api/user/login/
2. get scores request: http://127.0.0.1:8000/api/minewordle/user_top_scores/
   headers: Key: Authorization
            Value: Token 7d96e3ecb787c4c429b4b9b6462118ff5b55ef00
3. post scores request: same as get, but ensure you use post instead of get
   example data after logging in:
   {
    "difficulty": "medium",
    "score": 100
   }
"""
class UserTopScoresView(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ScoreSerializer

    def get_queryset(self):
        return Score.objects.filter(user=self.request.user).order_by('-score')[:10]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



