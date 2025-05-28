# settings.py

INSTALLED_APPS += [
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'authentication',
]

MIDDLEWARE.insert(0, 'corsheaders.middleware.CorsMiddleware')

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Add your frontend URL here
]

# Load environment variables
import environ
env = environ.Env()
environ.Env.read_env()

SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG', default=False)
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])