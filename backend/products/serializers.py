from rest_framework import serializers
from .models import Product, ProductAttribute

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'attribute_name', 'value', 'additional_price']

class ProductSerializer(serializers.ModelSerializer):
    # Embed all custom attributes inside the main product.
    attributes = ProductAttributeSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'description', 'base_price', 'stock_quantity', 'image_url', 'attributes']