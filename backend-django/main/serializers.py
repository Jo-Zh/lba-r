from rest_framework import serializers
from .models import Posts, Category, Notes, User, Comments
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
# from django.contrib.auth.models import User

class PostsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    creater = serializers.ReadOnlyField(source='creater.username')
    # reader = serializers.ReadOnlyField(source='reader.username')

    class Meta:
        model = Posts
        fields=['id','title', 'content', 'category', 'creater']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    # created_by=serializers.PrimaryKeyRelatedField(many=True, queryset=Posts.objects.all())
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['username', 'email', 'created_by']

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields='__all__'

#Authentication Registeration, login,
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    class Meta:
        model = User
        fields = ('username', 'email','password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'], email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        # user.email=validated_data['password']
        user.save()

        return user