# Minimal Django settings for AbleBank Copilot
SECRET_KEY = 'replace-this-with-a-secure-key'
DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',
]
ROOT_URLCONF = 'django_api.urls'
WSGI_APPLICATION = 'django_api.wsgi.application'
