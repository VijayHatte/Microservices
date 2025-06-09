from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from task_service.models import Task
from task_service.serializers import TaskSerializer

class TaskSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q', '').strip()
        if not query:
            return Response([])  # Empty query returns no results

        tasks = Task.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        )
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
        
