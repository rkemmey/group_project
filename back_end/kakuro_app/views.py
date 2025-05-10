from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import KakuroPuzzle
from .serializers import KakuroPuzzleSerializer
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from rest_framework.decorators import api_view
from .kakuro_generator import generate_kakuro



class OneKakuroPuzzleView(APIView):
    def get(self, request, id):
        try:
            puzzle = KakuroPuzzle.objects.get(id=id)
            serializer = KakuroPuzzleSerializer(puzzle)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KakuroPuzzle.DoesNotExist:
            return Response({"error": "Puzzle not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class KakuroSolutionView(APIView):
    def get(self, request, id):
        try:
            puzzle = KakuroPuzzle.objects.get(id=id)
            return Response({"solution": puzzle.solution}, status=status.HTTP_200_OK)
        except KakuroPuzzle.DoesNotExist:
            return Response({"error": "Solution not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AllKakuroPuzzlesView(ListAPIView):
    queryset = KakuroPuzzle.objects.all().order_by('-created_at')
    serializer_class = KakuroPuzzleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['difficulty']


class DeleteKakuroPuzzleView(APIView):
    def delete(self, request, id):
        try:
            puzzle = KakuroPuzzle.objects.get(id=id)
            puzzle.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except KakuroPuzzle.DoesNotExist:
            return Response({"error": "Puzzle not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def generate_kakuro_puzzle(request):
    difficulty = request.data.get('difficulty', 'easy')

    size_map = {
        "easy": 5,
        "medium": 7,
        "hard": 9,
    }
    size = size_map.get(difficulty, 5)

    board_data, solution = generate_kakuro(size)

    puzzle = KakuroPuzzle.objects.create(
        board_data=board_data,
        solution=solution,
        difficulty=difficulty,
    )
    serializer = KakuroPuzzleSerializer(puzzle)
    return Response(serializer.data, status=201)