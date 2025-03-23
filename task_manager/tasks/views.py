from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from .models import Task, User
from .serializers import TaskSerializer, UserSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        try:
            # Hash the password
            if 'password' in request.data:
                request.data['password'] = make_password(request.data['password'])
            
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        except IntegrityError as e:
            error_message = str(e)
            if 'username' in error_message:
                return Response(
                    {'error': 'This username is already taken.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            elif 'email' in error_message:
                return Response(
                    {'error': 'This email is already registered.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response(
                {'error': 'Failed to create account.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            if 'password' in request.data:
                request.data['password'] = make_password(request.data['password'])
            return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )