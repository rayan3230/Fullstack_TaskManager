from django.db import models

# Create your models here.

class User(models.Model):
    first_name = models.CharField(max_length=70)
    user_name = models.CharField(max_length=70, unique=True)
    email = models.EmailField(max_length=30, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Person(models.Model):
    first_Name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
