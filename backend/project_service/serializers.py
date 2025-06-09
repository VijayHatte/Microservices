from rest_framework import serializers
from .models import Project
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

class ProjectSerializer(serializers.ModelSerializer):
    
    owner = UserSerializer(read_only = True)
    members = UserSerializer(many = True, read_only = True)
    member_id = serializers.PrimaryKeyRelatedField(
        many = True, queryset= User.objects.all(), write_only = True, source = 'members'
    )

    class Meta:
        model = Project
        fields = ['id','name','description','owner','members','member_id','created_at','updated_at']

    def create(self, validated_data):
        members = validated_data.pop('members',[])
        validated_data.pop('owner', None)
        project = Project.objects.create(owner=self.context['request'].user,**validated_data)
        project.members.set(members)
        return project

    def update(self, instance, validated_data):
        members = validated_data.pop('members',None)
        for attr, value in validated_data.items():
            setattr(instance,attr,value)
        instance.save()
        
        if members is not None:
            instance.members.set(members)
        return instance