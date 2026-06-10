from django.contrib import admin
from django.urls import path, include
from .views import GoogleLoginView  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    
    # ENDPOINT GOOGLE: To make Django prioritize capturing this API from React.
    path('api/auth/google/', GoogleLoginView.as_view(), name='google_login_custom'),
    
    # Basic authentication routes (Duplicate lines completely removed)
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
]