from django.urls import include, path

urlpatterns = [
    # ...existing url patterns...
]

urlpatterns += [
    path('api/auth/', include('authentication.urls')),
]