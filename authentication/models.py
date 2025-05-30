from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):
    # Add custom fields
    google_id = models.CharField(max_length=150, blank=True, null=True)
    profile_picture = models.URLField(max_length=500, blank=True, null=True)
    
    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_set",
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )

    def __str__(self):
        return self.email or self.username
