from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Posts, Category, Notes, User, Comments
from .serializers import PostsSerializer, CategorySerializer, NotesSerializer, UserSerializer, CommentsSerializer,  MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework import generics, permissions
from .permissions import IsOwnerOrReadOnly
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'register': reverse('auth_register', request=request, format=format),
        'token': reverse('token_obtain_pair', request=request, format=format ),
        'token_refresh': reverse('token_refresh', request=request,format=format),
        # 'users': reverse('users-list', request=request, format=format),
        'posts': reverse('posts-list', request=request, format=format),
    })

#register login
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer



@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token/',
        '/register/',
        '/token/refresh/'
    ]
    return Response(routes)




# for post articles

class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    #                   IsOwnerOrReadOnly]

    


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creater=self.request.user)



#for manage users
# class UsersList(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
    


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                      IsOwnerOrReadOnly]


#for comments
@csrf_exempt
def comments_list(request):
    """
    List all, or create a new.
    """
    if request.method == 'GET':
        comments = Comments.objects.all()
        serializer = CommentsSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@csrf_exempt
def comment_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        comment = Comments.objects.get(pk=pk)
    except Comments.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CommentsSerializer(comment)
        return JsonResponse(serializer.data)


    elif request.method == 'PUT':      
        serializer = CommentsSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return HttpResponse(status=204)


#for notes
@csrf_exempt
def notes_list(request):
    """
    List all, or create a new.
    """
    if request.method == 'GET':
        notes = Notes.objects.all()
        serializer = NotesSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NotesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def note_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        note = Notes.objects.get(pk=pk)
    except Notes.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = NotesSerializer(note)
        return JsonResponse(serializer.data)


    elif request.method == 'DELETE':
        note.delete()
        return HttpResponse(status=204)