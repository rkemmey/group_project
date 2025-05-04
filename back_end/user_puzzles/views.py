from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from .models import PuzzleProgress
from .serializers import PuzzleProgressSerializer

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

'''
GET /api/progress/ (list all saved progress for user)
POST /api/progress/upsert (save/update or create new progress)
GET /api/progress/<id>/ (retrieve one)
DELETE /api/progress/<id>/ (delete)
'''

class PuzzleProgressViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = PuzzleProgressSerializer

    def get_queryset(self):
        return PuzzleProgress.objects.filter(user=self.request.user)

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='upsert')
    def upsert(self, request):
        user = request.user
        content_type = request.data['content_type']
        object_id = request.data['object_id']
        progress = request.data['progress']
        is_completed = request.data.get('is_completed', False)

        # Update or create the PuzzleProgress object
        instance, created = PuzzleProgress.objects.update_or_create(
            user=user,
            content_type_id=content_type,
            object_id=object_id,
            defaults={
                'progress': progress,
                'is_completed': is_completed
            }
        )

        # Serialize the instance to return
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)
    
    #delete based on content_type and id
    @action(detail=False, methods=['delete'], url_path='delete')
    def delete_progress(self, request):
        user = request.user
        content_type = request.data.get('content_type')
        object_id = request.data.get('object_id')

        if not content_type or not object_id:
            return Response({'detail': 'Missing content_type or object_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            progress = PuzzleProgress.objects.get(user=user, content_type_id=content_type, object_id=object_id)
            progress.delete()
            return Response({'detail': 'Progress deleted'}, status=status.HTTP_204_NO_CONTENT)
        except PuzzleProgress.DoesNotExist:
            return Response({'detail': 'Progress not found'}, status=status.HTTP_404_NOT_FOUND)
