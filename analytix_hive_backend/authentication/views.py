from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .serializers import UserSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
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

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle]

    def get(self, request):
        return Response({"message": "This is a protected endpoint."})

class GoogleLoginView(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.GOOGLE_CALLBACK_URL
    client_class = OAuth2Client

class GoogleAuthCallbackView(APIView):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return Response({'error': 'No authorization code provided'},
                          status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Process the authorization code and get user info
            adapter = GoogleOAuth2Adapter(request)
            access_token = adapter.get_access_token(code)
            user_data = adapter.get_user_info(access_token)
            
            # Create or get user
            user = adapter.get_user(user_data)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username
                }
            })
        except Exception as e:
            return Response({'error': str(e)},
                          status=status.HTTP_400_BAD_REQUEST)
