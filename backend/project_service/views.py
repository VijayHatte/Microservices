from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        owner_projects = Project.objects.filter(owner=user)
        member_projects = Project.objects.filter(members=user)
        combined_projects = (owner_projects | member_projects).distinct()
        return combined_projects

    
    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)