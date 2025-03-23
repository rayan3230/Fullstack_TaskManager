from rest_framework import serializers
from .models import Task, User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'user_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'user_name': {'required': True},
            'first_name': {'required': True}
        }