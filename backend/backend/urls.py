
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/',include('user_services.urls')),
    path('api/task/', include('task_service.urls')),
    path('api/task/', include('search_service.urls')),
    path('api/notification/',include('notification_service.urls')),
    path('api/project/',include('project_service.urls')),
    path('api/comment/',include('comment_service.urls')),
]
