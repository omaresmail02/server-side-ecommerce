from django.contrib.auth.models import AbstractUser
from django.db import models


from django.utils import timezone

class CustomUser(AbstractUser):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
