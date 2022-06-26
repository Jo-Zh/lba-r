from django.urls import include, path
from . import views
from rest_framework import routers

# router=routers.DefaultRouter()
# router.register(r'posts', views.PostsViewSet)
# router.register(r'category', views.CategoryViewSet)
# router.register(r'user', views.UserViewSet)
# router.register(r'notes', views.NotesViewSet)



urlpatterns=[
    # Wire up our API using automatic URL routing.
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('posts/', views.posts_list),
    path('posts/<int:pk>/', views.post_detail),
]