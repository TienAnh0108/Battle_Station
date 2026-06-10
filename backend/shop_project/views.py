import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class GoogleLoginView(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({'error': 'Thiếu access_token'}, status=status.HTTP_400_BAD_REQUEST)

        # Call the Google API directly to authenticate and retrieve user information.
        google_response = requests.get(
            f'https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}'
        )
        
        if google_response.status_code != 200:
            return Response({'error': 'Token Google không hợp lệ hoặc đã hết hạn'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_info = google_response.json()
        email = user_info.get('email')
        
        if not email:
            return Response({'error': 'Không lấy được Email từ tài khoản Google này'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user already exists in SQL Server; if not, create a new one manually.
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,  
                'first_name': user_info.get('given_name', ''),
                'last_name': user_info.get('family_name', ''),
            }
        )

        # Generate your own genuine JWT (Access & Refresh) token pair and provide it to React.
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'email': user.email,
            'message': 'Đăng nhập Google thành công rực rỡ!'
        }, status=status.HTTP_200_OK)