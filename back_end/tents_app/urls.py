# tents_app/urls.py
from django.urls import path
from .views import AllTentsPuzzlesView, OneTentsPuzzleView, generate_tents_puzzle, DeleteTentsPuzzleView, get_tents_solution

urlpatterns = [
    path('allpuzzles/', AllTentsPuzzlesView.as_view(), name='all_tents'),
    path('generate/', generate_tents_puzzle, name='generate_tents_puzzle'),
    path('puzzle/delete/<int:id>/', DeleteTentsPuzzleView.as_view(), name='delete_tents_puzzle'),
    path('puzzle/<int:id>/', OneTentsPuzzleView.as_view(), name='one_tents'),
    path('solution/<int:id>/', get_tents_solution, name='tents_solution'),
]