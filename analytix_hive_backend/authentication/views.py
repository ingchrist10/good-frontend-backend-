from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .serializers import UserSerializer

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
