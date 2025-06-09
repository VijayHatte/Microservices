from django.urls import path
from .views import UserNotificationView

urlpatterns = [
    path('my/',UserNotificationView.as_view(),name="user-notifications"),
]