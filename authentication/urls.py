from django.urls import path, re_path
from .views import RegisterView, ProtectedView, GoogleLogin, GoogleCallback
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dj_rest_auth.registration.views import (
    SocialAccountListView, SocialAccountDisconnectView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    
    # Google OAuth URLs
    path('google/', GoogleLogin.as_view(), name='google_login'),
    path('google/callback/', GoogleCallback.as_view(), name='google_callback'),
    path('social/accounts/', SocialAccountListView.as_view(), name='social_account_list'),
    re_path(
        r'^social/accounts/(?P<pk>\d+)/disconnect/$',
        SocialAccountDisconnectView.as_view(),
        name='social_account_disconnect'
    ),
]
