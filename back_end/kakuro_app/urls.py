# kakuro_app/urls.py

from django.urls import path
from .views import (
    AllKakuroPuzzlesView,
    OneKakuroPuzzleView,
    DeleteKakuroPuzzleView,
    generate_kakuro_puzzle,
    KakuroSolutionView
)

urlpatterns = [
    path('puzzle/<int:id>/', OneKakuroPuzzleView.as_view()),
    path('solution/<int:id>/', KakuroSolutionView.as_view()),
    path('allpuzzles/', AllKakuroPuzzlesView.as_view()),
    path('generate/', generate_kakuro_puzzle),
    path('<int:id>/delete/', DeleteKakuroPuzzleView.as_view()),  # ✅ FIXED
]
