from rest_framework import serializers
from .models import Posts, Category, Notes, User, Comments
# from django.contrib.auth.models import User

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields=['id','title', 'content', 'cover', 'category','creater']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields='__all__'