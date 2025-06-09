from django.urls import path
from .views import TaskSearchView

urlpatterns = [
    path('search/', TaskSearchView.as_view(), name='task-search'),
]
