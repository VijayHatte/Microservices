from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.exceptions import ValidationError
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        task_id=self.request.query_params.get('task')
        if task_id:
            if not task_id.isdigit():
                raise ValidationError({"task": "Task ID must be a number."})
            return Comment.objects.filter(task_id=int(task_id), user=user).order_by('-created_at')
        return Comment.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)