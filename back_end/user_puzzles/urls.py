# from django.urls import path
# from .views import PuzzleProgressViewSet

# urlpatterns = [
#     path('', PuzzleProgressViewSet.as_view(), name='progress'),
# ]

from rest_framework.routers import DefaultRouter
from .views import PuzzleProgressViewSet

router = DefaultRouter()
router.register(r'', PuzzleProgressViewSet, basename='progress')

urlpatterns = router.urls