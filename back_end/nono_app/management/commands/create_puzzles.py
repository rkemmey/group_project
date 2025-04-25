# management/commands/fetch_sudoku_puzzles.py
from django.core.management.base import BaseCommand
from rest_framework.views import Response
import requests
from requests_oauthlib import OAuth1
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import numpy as np
from puzzle_proj.settings import env
from ...models import ImagePixels
from resources.utils import store_view, fetch_white_background

class Command(BaseCommand):
    help = 'Fetches Image from API and stores pixels, puzzle grid in the database'

    def handle(self, *args, **kwargs):
        num_puzzles = 4 # adjust
        count =  80 # adjust
        for _ in range(num_puzzles):
            auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
            endpoint = f"https://api.thenounproject.com/v2/icon/{count}"
            response = requests.get(endpoint, auth=auth)
            responseJSON = response.json()
            image_url = responseJSON['icon']['thumbnail_url']
            try:
                # send url to fetch with white background
                img = fetch_white_background(image_url)
                pixel_arr = np.array(img).tolist()
                img_obj, created = ImagePixels.objects.get_or_create(source_url=image_url, 
                                                                defaults={'pixels': pixel_arr})
                # send img to store view -> binary builder -> generate nonogram
                store_view(img_obj, img)
                if not created:
                    print("Pixels already existed!")
                print("Pixels for image:", count)
            except (requests.RequestException, UnidentifiedImageError) as e:
                print(f"Image fetch/convert failed: {e}")
            count = count + 1
            
        print("complete")
