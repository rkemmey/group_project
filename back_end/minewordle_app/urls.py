from django.urls import path
from .views import get_random_word

urlpatterns = [
    path('get_random_word/', get_random_word, name='get_random_word'),
]