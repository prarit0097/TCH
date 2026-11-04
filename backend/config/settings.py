import os
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = os.environ.get('DJANGO_DEBUG', 'false').lower() == 'true'
TESTING = os.environ.get('DJANGO_TESTING') == 'true'
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '')
if not SECRET_KEY:
    if not (DEBUG or TESTING):
        raise ImproperlyConfigured('Set DJANGO_SECRET_KEY; development requires DJANGO_DEBUG=true.')
    SECRET_KEY = 'local-development-only-not-a-production-key-1234567890'
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1,testserver' if (DEBUG or TESTING) else 'thecircadianhospital.com,www.thecircadianhospital.com').split(',')
INSTALLED_APPS = ['django.contrib.admin', 'django.contrib.auth', 'django.contrib.contenttypes', 'django.contrib.sessions', 'django.contrib.messages', 'django.contrib.staticfiles', 'enquiries']
MIDDLEWARE = ['django.middleware.security.SecurityMiddleware', 'django.contrib.sessions.middleware.SessionMiddleware', 'django.middleware.common.CommonMiddleware', 'django.middleware.csrf.CsrfViewMiddleware', 'django.contrib.auth.middleware.AuthenticationMiddleware', 'django.contrib.messages.middleware.MessageMiddleware', 'django.middleware.clickjacking.XFrameOptionsMiddleware']
ROOT_URLCONF = 'config.urls'
TEMPLATES = [{'BACKEND': 'django.template.backends.django.DjangoTemplates', 'DIRS': [], 'APP_DIRS': True, 'OPTIONS': {'context_processors': ['django.template.context_processors.request', 'django.contrib.auth.context_processors.auth', 'django.contrib.messages.context_processors.messages']}}]
WSGI_APPLICATION = 'config.wsgi.application'
if os.environ.get('POSTGRES_HOST'):
    DATABASES = {'default': {'ENGINE': 'django.db.backends.postgresql', 'HOST': os.environ['POSTGRES_HOST'], 'PORT': os.environ.get('POSTGRES_PORT', '5432'), 'NAME': os.environ.get('POSTGRES_DB', 'circadian'), 'USER': os.environ.get('POSTGRES_USER', 'circadian'), 'PASSWORD': os.environ['POSTGRES_PASSWORD'], 'CONN_MAX_AGE': 60}}
elif DEBUG or TESTING:
    DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'dev.sqlite3'}}
else:
    raise ImproperlyConfigured('Production requires POSTGRES_HOST and database credentials.')
AUTH_PASSWORD_VALIDATORS = [{'NAME': f'django.contrib.auth.password_validation.{name}'} for name in ['UserAttributeSimilarityValidator', 'MinimumLengthValidator', 'CommonPasswordValidator', 'NumericPasswordValidator']]
LANGUAGE_CODE = 'en-in'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True
STATIC_URL = '/django-static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
DATA_UPLOAD_MAX_MEMORY_SIZE = 8192
CSRF_FAILURE_VIEW = 'enquiries.views.csrf_failure'
CSRF_TRUSTED_ORIGINS = os.environ.get('DJANGO_CSRF_TRUSTED_ORIGINS', 'https://thecircadianhospital.com,https://www.thecircadianhospital.com').split(',')
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = not (DEBUG or TESTING)
SESSION_COOKIE_SECURE = not (DEBUG or TESTING)
CSRF_COOKIE_SECURE = not (DEBUG or TESTING)
SESSION_COOKIE_HTTPONLY = True
SECURE_HSTS_SECONDS = 31536000 if not (DEBUG or TESTING) else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
X_FRAME_OPTIONS = 'DENY'
ENQUIRY_RATE_LIMIT = 5
ENQUIRY_TRUST_PROXY = os.environ.get('ENQUIRY_TRUST_PROXY', 'false').lower() == 'true'
