from django.urls import path
from .views import MyTokenObtainPairView, RegisterUser

app_name = 'users'

urlpatterns = [
    path('create/', RegisterUser.as_view(), name="create_user"),
    path('login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
]