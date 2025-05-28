from django.urls import include, path
import pprint

urlpatterns = [
    # ...existing url patterns...
]

urlpatterns += [
    path('api/auth/', include('authentication.urls')),
]

pprint.pprint(urlpatterns)