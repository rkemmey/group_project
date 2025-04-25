# management/commands/fetch_sudoku_puzzles.py
from django.core.management.base import BaseCommand
import requests
from ...models import SudokuPuzzle

class Command(BaseCommand):
    help = 'Fetches Sudoku puzzles from API and stores them in the database'

    def handle(self, *args, **kwargs):
        num_puzzles = 50
        for _ in range(num_puzzles):
            response = requests.get("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}")  # replace with real URL
            if response.status_code == 200:
                SudokuPuzzle.objects.create(puzzle_data=response.json())
                self.stdout.write(self.style.SUCCESS("Puzzle added"))
            else:
                self.stderr.write("Failed to fetch puzzle")

        print("complete")
