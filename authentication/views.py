from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .serializers import UserSerializer, GoogleAuthSerializer
from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.tokens import RefreshToken

class LoginRateThrottle(AnonRateThrottle):
    rate = '5/minute'
    scope = 'login'

class RegisterRateThrottle(AnonRateThrottle):
    rate = '3/hour'
    scope = 'register'

class RegisterView(APIView):
    throttle_classes = [RegisterRateThrottle]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = settings.GOOGLE_CALLBACK_URL
    
    def get_response(self):
        response = super().get_response()
        if self.user:
            # Update or create user profile data from Google
            social_account = self.user.socialaccount_set.get(provider='google')
            extra_data = social_account.extra_data
            
            self.user.google_id = extra_data.get('sub')
            self.user.profile_picture = extra_data.get('picture')
            self.user.first_name = extra_data.get('given_name', '')
            self.user.last_name = extra_data.get('family_name', '')
            self.user.save()
            
            # Add user data to response
            response.data['user'] = {
                'id': self.user.id,
                'email': self.user.email,
                'first_name': self.user.first_name,
                'last_name': self.user.last_name,
                'profile_picture': self.user.profile_picture
            }
        return response

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        return Response({
            "message": "This is a protected endpoint.",
            "user": {
                "id": request.user.id,
                "email": request.user.email,
                "username": request.user.username,
                "profile_picture": request.user.profile_picture
            }
        })
