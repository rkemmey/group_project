from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests 
from rest_framework.generics import ListAPIView
from .models import SudokuPuzzle
from .serializers import SudokuPuzzleSerializer

# Create your views here.
# class Sol_api(APIView):
#     def get(self, request):
#         endpoint = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}"
#         response = requests.get(endpoint) 
#         responseJSON = response.json() 
#         return Response(responseJSON)
    
class AllSudokusView(ListAPIView):
    queryset = SudokuPuzzle.objects.all()
    serializer_class = SudokuPuzzleSerializer

class OneSudokuView(ListAPIView):
    def get(self, request, id):
        puzzle = SudokuPuzzle.objects.get(id=id)
        ser = SudokuPuzzleSerializer(puzzle)
        return Response(ser.data)