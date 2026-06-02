from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')), 

    # Login, Logout, Password Reset URLs
    path('api/auth/', include('dj_rest_auth.urls')),

    # Register URLs (Internal Account Registration)
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
]