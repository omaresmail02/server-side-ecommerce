from rest_framework import serializers
from .models import Product, Category, Review



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    #product = ProductSerializer(read_only=True)
    product = serializers.ReadOnlyField(source='product.id')
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'user', 'username', 'product', 'createdAt', 'updatedAt']