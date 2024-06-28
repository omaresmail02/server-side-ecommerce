from django.urls import path
from .views import (
    UserListView, 
    UserDetailView, 
    UserCreateView,
    CurrentUserView
)

urlpatterns = [
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('me/', CurrentUserView.as_view(), name='current-user'),  
    path('<int:pk>', UserDetailView.as_view(), name='user-detail'),
    path('', UserListView.as_view(), name='user-list'),
]
