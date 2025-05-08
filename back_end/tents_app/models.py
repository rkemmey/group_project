from django.db import models

DIFFICULTY_CHOICES = [
    ('easy', 'Easy'),
    ('medium', 'Medium'),
    ('hard', 'Hard'),
]

class TentsPuzzle(models.Model):
    layout = models.JSONField(default=list)
    board_data = models.JSONField(default=list)
    solution = models.JSONField(default=list)
    row_clues = models.JSONField(default=list)
    col_clues = models.JSONField(default=list)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Tents Puzzle ({self.id})"
