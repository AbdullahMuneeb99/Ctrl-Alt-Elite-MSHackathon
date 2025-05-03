from django.db import models

# Example model for user profile
class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    accessibility_mode = models.CharField(max_length=50)
