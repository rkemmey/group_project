from django.db import models
# Create your models here.
from django.contrib.postgres.fields import ArrayField, JSONField  # depends on Django version

# psql table to store image pixels 
class ImagePixels(models.Model):
    source_url = models.URLField(unique=True) 
    pixels = models.JSONField() 
    created_at = models.DateTimeField(auto_now_add=True)

class NonogramPuzzle(models.Model):
    image = models.OneToOneField(ImagePixels, on_delete=models.CASCADE, related_name='puzzle')
    rows = models.IntegerField()
    cols = models.IntegerField()
    row_hints = models.JSONField(blank=True, null=True)
    column_hints = models.JSONField(blank=True, null=True)
    solution = ArrayField(ArrayField(models.IntegerField()))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Nonogram ({self.rows}x{self.cols})"
    
    @property
    def size(self):
        return (self.rows, self.cols)