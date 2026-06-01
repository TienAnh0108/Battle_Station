from django.contrib import admin
from .models import Product, ProductAttribute

# Cấu hình hiển thị dạng bảng lồng nhau (Inline) trong trang Admin
class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    extra = 1 # Cho phép thêm nhanh 1 dòng thuộc tính mới

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'base_price', 'stock_quantity')
    list_filter = ('category',)
    search_fields = ('name',)
    inlines = [ProductAttributeInline] # Hiển thị các option custom ngay trong trang chi tiết sản phẩm
