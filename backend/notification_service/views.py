from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer

class UserNotificationView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_class = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-timestamp')