from django.contrib import admin
from django.urls import include, path
from django.http import JsonResponse
import pprint

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += [
    path('api/auth/', include('authentication.urls')),
]

def debug_view(request):
    return JsonResponse({'urls': [str(pattern) for pattern in urlpatterns]})

urlpatterns += [
    path('debug/', debug_view),
]

pprint.pprint(urlpatterns)