from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('LIGHT', 'LED Lights'),
        ('STAND', 'Monitor Stands / Arms'),
        ('DESK', 'Smart / Ergonomic Desks'),
        ('CHAIR', 'Ergonomic Chairs'),
        ('PAD', 'Mousepads'),
    ]

    name = models.CharField(max_length=255, verbose_name="Tên sản phẩm")
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='DESK', verbose_name="Danh mục")
    description = models.TextField(blank=True, null=True, verbose_name="Mô tả")
    base_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Giá cơ bản")
    stock_quantity = models.IntegerField(default=0, verbose_name="Số lượng trong kho")
    image_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="Link ảnh sản phẩm")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_category_display()}] {self.name}"

class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes', verbose_name="Sản phẩm chính")
    attribute_name = models.CharField(max_length=100, verbose_name="Loại tùy biến") # Ví dụ: "Mặt bàn", "Kích thước", "Màu LED"
    value = models.CharField(max_length=100, verbose_name="Giá trị tùy biến")        # Ví dụ: "Gỗ sồi", "1.4m x 0.7m", "RGB"
    additional_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Giá cộng thêm")

    def __str__(self):
        return f"{self.product.name} - {self.attribute_name}: {self.value} (+${self.additional_price})"