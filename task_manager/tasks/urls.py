from django.urls import path ,include
from .import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'tasks', views.TaskViewSet, basename='task')
router.register(r'users', views.UserViewSet)



urlpatterns = [
    path('api/', include(router.urls)),

]


