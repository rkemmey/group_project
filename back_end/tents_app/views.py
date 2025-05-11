from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import TentsPuzzle
from .serializers import TentsPuzzleSerializer
from rest_framework.decorators import api_view
from .tents_generator import generate_tents
from .tents_generator import generate_tents_solution  # or correct path




class OneTentsPuzzleView(APIView):
    def get(self, request, id):
        try:
            puzzle = TentsPuzzle.objects.get(id=id)
            serializer = TentsPuzzleSerializer(puzzle)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except TentsPuzzle.DoesNotExist:
            return Response({"error": "Puzzle not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class AllTentsPuzzlesView(ListAPIView):
    queryset = TentsPuzzle.objects.all().order_by('-created_at')
    serializer_class = TentsPuzzleSerializer




@api_view(['POST'])
def generate_tents_puzzle(request):
    difficulty = request.data.get('difficulty', 'easy')


    if difficulty == "easy":
        size = 5
    elif difficulty == "medium":
        size = 7
    else:
        size = 9


    try:
        tents_data = generate_tents(size)


        puzzle = TentsPuzzle.objects.create(
            layout=tents_data['layout'],
            board_data=tents_data['puzzle']['board'],
            solution=tents_data['solution'],
            row_clues=tents_data['puzzle']['row_clues'],
            col_clues=tents_data['puzzle']['col_clues'],
            difficulty=difficulty,
            created_at=timezone.now(),
        )
        serializer = TentsPuzzleSerializer(puzzle)
        return Response(serializer.data, status=201)


    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class DeleteTentsPuzzleView(APIView):
    def delete(self, request, id):
        try:
            puzzle = TentsPuzzle.objects.get(id=id)
            puzzle.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TentsPuzzle.DoesNotExist:
            return Response({"error": "Puzzle not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_tents_solution(request, id):
    try:
        puzzle = TentsPuzzle.objects.get(id=id)

        # Use the stored solution!
        if not puzzle.solution:
            return Response({"error": "No stored solution."}, status=400)

        return Response({"solution": puzzle.solution})

    except TentsPuzzle.DoesNotExist:
        return Response({"error": "Puzzle not found"}, status=404)

    except Exception as e:
        return Response({"error": "Internal Server Error"}, status=500)
