from rest_framework import serializers
from .models import Posts, Category, Notes, User, Comments
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id','username', 'email', 'last_login', 'is_poster','is_reader' ]


class PostsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    creater = serializers.ReadOnlyField(source='creater.username')
    reader = UserSerializer(many=True, required=False)

    class Meta:
        model = Posts
        fields='__all__'
        # fields=['id','title', 'content', 'category', 'creater']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields='__all__'


     

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
        fields = ('username', 'email','password', 'password2', 'is_reader', 'is_poster')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'], email=validated_data['email'], is_poster=validated_data["is_poster"], is_reader=validated_data["is_reader"]
        )
        user.set_password(validated_data['password'])
        user.save()

        return user