from django.shortcuts import render
from rest_framework import viewsets, permissions,filters
from .models import Task
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ['status','priority','assigned_to']
    search_fields = ['title','description']
    ordering_fields = ['created_at','updated_at']

@api_view(['GET'])

def task_summary(request):
    total_tasks = Task.objects.count()
    completed_tasks = Task.objects.filter(status='DONE').count()
    pending_tasks = total_tasks - completed_tasks

    return Response({
        "total_tasks":total_tasks,
        "completed_tasks":completed_tasks,
        "pending_tasks":pending_tasks
    })