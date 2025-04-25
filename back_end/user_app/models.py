from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core import validators as v


# Create your models here.
    
class UserManager(BaseUserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        # Note: no username parameter here
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    display_name = models.CharField(default='unknown' , max_length=50)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email