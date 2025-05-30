from django.urls import path
from .views import RegisterView, ProtectedView, GoogleLoginView, GoogleAuthCallbackView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    # Google OAuth URLs
    path('google/', GoogleLoginView.as_view(), name='google_login'),
    path('google/callback/', GoogleAuthCallbackView.as_view(), name='google_callback'),
]
