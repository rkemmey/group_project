from django.db import models

# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=5)
    
    class Meta:
        db_table = 'words'

