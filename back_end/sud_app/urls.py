from django.urls import path
from .views import AllSudokusView, OneSudokuView

urlpatterns = [
    # path('', Sol_api.as_view(), name="sol_api"),
    path('allpuzzles/', AllSudokusView.as_view(), name='all_puzzles'),  # GET - all puzzles
    path('puzzle/<int:id>/', OneSudokuView.as_view(), name='a_puzzle'),  # GET a puzzle
]