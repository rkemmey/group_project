from django.urls import path
from .views import get_random_word, UserTopScoresView

urlpatterns = [
    path('get_random_word/', get_random_word, name='get_random_word'),
    path('user_top_scores/', UserTopScoresView.as_view(), name='user_top_scores'),
]