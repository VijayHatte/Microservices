from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('developer', 'Developer'),
        ('tester', 'Tester'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='developer')

    groups = models.ManyToManyField(Group, related_name="user_service_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="user_service_permissions", blank=True)

    def __str__(self):
        return self.username