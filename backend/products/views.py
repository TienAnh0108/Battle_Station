from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint cho phép xem danh sách sản phẩm và chi tiết từng sản phẩm.
    ReadOnlyModelViewSet chỉ mở các cổng GET (không cho phép POST/PUT/DELETE từ bên ngoài công cộng).
    """
    queryset = Product.objects.all().prefetch_related('attributes')
    serializer_class = ProductSerializer