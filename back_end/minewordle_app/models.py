from django.db import models
from django.conf import settings

# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=5)
    
    class Meta:
        db_table = 'words'


class Score(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=10, choices=[
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ])
    score = models.PositiveIntegerField()

    # highest scores first
    class Meta:
        db_table = 'scores'
        ordering = ['-score']  

    def __str__(self):
        return f"{self.user.username} - {self.score} ({self.difficulty})"