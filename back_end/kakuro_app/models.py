# kakuro_app/models.py
from django.db import models
from django.core.exceptions import ValidationError

DIFFICULTY_CHOICES = [
    ('easy', 'Easy'),
    ('medium', 'Medium'),
    ('hard', 'Hard'),
]

class KakuroPuzzle(models.Model):
    board_data = models.JSONField()  # full puzzle data
    solution = models.JSONField()    # solved grid
    created_at = models.DateTimeField(auto_now_add=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy')  # ✅ NEW

    def __str__(self):
        return f"Kakuro Puzzle ({self.id})"

    def validate_solution(self):
        board = self.board_data
        solution = self.solution

        if not isinstance(board, list) or not isinstance(solution, list):
            raise ValidationError("Board and solution must be lists.")
        
        if len(board) != len(solution):
            raise ValidationError("Board and solution row counts do not match.")

        for row_index, (board_row, solution_row) in enumerate(zip(board, solution)):
            if len(board_row) != len(solution_row):
                raise ValidationError(f"Row {row_index} length mismatch between board and solution.")
            for col_index, (cell, value) in enumerate(zip(board_row, solution_row)):
                if 'type' not in cell:
                    raise ValidationError(f"Cell at ({row_index}, {col_index}) is missing 'type'.")
                if cell["type"] == "input":
                    if not isinstance(value, int) or not (1 <= value <= 9):
                        raise ValidationError(
                            f"Invalid value {value} at ({row_index}, {col_index}) — must be 1–9."
                        )
                else:
                    if value is not None:
                        raise ValidationError(
                            f"Non-input cell at ({row_index}, {col_index}) should be None in solution."
                        )
