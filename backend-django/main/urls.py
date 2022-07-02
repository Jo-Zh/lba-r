from django.urls import include, path
from . import views
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns=[
    # Wire up our API using automatic URL routing.
    path('', views.api_root),
    # path('', views.getRoutes),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),

    path('posts/', views.PostsList.as_view(),name='posts-list'),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('users/', views.UsersList.as_view(), name='users-list'),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('comments/', views.comments_list),
    path('comments/<int:pk>', views.comment_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns +=[
    path('api-auth/', include('rest_framework.urls')),
]