from django.core.management.base import BaseCommand
from nono_app.models import ImagePixels, NonogramPuzzle

class Command(BaseCommand):
    help = 'Clears the YourModel table'

    def handle(self, *args, **kwargs):
        ImagePixels.objects.all().delete()
        self.stdout.write("Cleared ImagePixels table.")
        NonogramPuzzle.objects.all().delete()
        self.stdout.write("Cleared Nonogram Puzzle table.")
