from django.shortcuts import render
from rest_framework.views import APIView, Response
import requests
from requests_oauthlib import OAuth1
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import numpy as np
from puzzle_proj.settings import env
from .models import ImagePixels, NonogramPuzzle
from rest_framework.generics import ListAPIView
from .serializers import ImagePixelsSerializer, NonogramPuzzleSerializer
from resources.utils import store_view

# class Noun_Project(APIView): # search for an icon to build a puzzle, save in psql db
#     def get(self, request):
#         auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
#         endpoint = "https://api.thenounproject.com/v2/icon/1"
#         response = requests.get(endpoint, auth=auth)
#         responseJSON = response.json()
#         #return Response(responseJSON)
#         #return Response(responseJSON['icons'][0]['thumbnail_url'])
#         image_url = responseJSON['icon']['thumbnail_url']
#         try:
#             image_response = requests.get(image_url, timeout=10)
#             image_response.raise_for_status()
#             img = Image.open(BytesIO(image_response.content)).convert('L')
#             pixel_arr = np.array(img).tolist()
#             img_obj, created = ImagePixels.objects.get_or_create(source_url=image_url, 
#                                                              defaults={'pixels': pixel_arr})
#             # send img to store view -> binary builder -> generate nonogram
#             store_view(img_obj, img)
#             if not created:
#                 print("Pixels already existed!")
#             #ImagePixels.objects.create(source_url=image_url, pixels=pixel_arr)
#             return Response(pixel_arr)
#         except (requests.RequestException, UnidentifiedImageError) as e:
#             print(f"Image fetch/convert failed: {e}")
#             return Response('Nothing')
#         #return Response(responseJSON['icon']['thumbnail_url'])

# http://127.0.0.1:8000/api/nonogram/allpixels/
class AllPixelsView(ListAPIView):
    queryset = ImagePixels.objects.all()
    serializer_class = ImagePixelsSerializer

# http://127.0.0.1:8000/api/nonogram/pixels/1/
class OnePixelsView(APIView):
    def get(self, request, id):
        img = ImagePixels.objects.get(id=id)
        ser = ImagePixelsSerializer(img)
        return Response(ser.data)

class AllNonogramsView(ListAPIView):
    queryset = NonogramPuzzle.objects.all()
    serializer_class = NonogramPuzzleSerializer

class OneNonogramView(ListAPIView):
    def get(self, request, id):
        puzzle = NonogramPuzzle.objects.get(id=id)
        ser = NonogramPuzzleSerializer(puzzle)
        return Response(ser.data)


        