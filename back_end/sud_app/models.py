from django.db import models

class SudokuPuzzle(models.Model):
    puzzle_data = models.JSONField()  # stores the whole puzzle from the API
    created_at = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)