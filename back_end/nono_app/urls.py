from django.urls import path
from .views import AllPixelsView, OnePixelsView, AllNonogramsView, OneNonogramView

urlpatterns = [
    #path("", nonogram_api, name="nonogram_api"),
    #path('noun/', Noun_Project.as_view(), name='nonogram_api'),  # POST- store 1 images pixels
    path('allpixels/', AllPixelsView.as_view(), name='all_pixels'), # GET - all pixels
    path('pixels/<int:id>/', OnePixelsView.as_view(), name='a_pixel'), # GET pixels for one image
    path('allpuzzles/', AllNonogramsView.as_view(), name='all_puzzles'),  # GET - all puzzles
    path('puzzle/<int:id>/', OneNonogramView.as_view(), name='a_puzzle'),  # GET a puzzle

]
