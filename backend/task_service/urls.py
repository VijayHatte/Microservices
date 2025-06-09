from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet,task_summary

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('summary/', task_summary),
    path('tasks/', include(router.urls)),  # Adding a clear 'tasks' path
]
