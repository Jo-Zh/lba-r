from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Posts, Category, Notes, User, Comments
from .serializers import PostsSerializer, CategorySerializer, NotesSerializer, UserSerializer, CommentsSerializer

# Create your views here.
# for post articles
@csrf_exempt
def posts_list(request):
    """
    List all, or create a new.
    """
    if request.method == 'GET':
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PostsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def post_detail(request, pk):
    """
    Retrieve, update or delete.
    """
    try:
        post = Posts.objects.get(pk=pk)
    except Posts.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PostsSerializer(post)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PostsSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        post.delete()
        return HttpResponse(status=204)

#for manage users
@csrf_exempt
def users_list(request):
    """
    List all, or create a new.
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def user_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)

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