from rest_framework import serializers
from .models import Comment
from django.contrib.auth import get_user_model
from project_service.serializers import UserSerializer

User = get_user_model()

class CommentSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id','task','user','content','created_at']
        read_only_fields = ['id','user','created_at']