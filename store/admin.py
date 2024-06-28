from django.contrib import admin
from .models import Category, Product
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title']
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
 'title',
 'price',
 'stock',
 'createdAt',
 'updatedAt'
    ]
    list_filter = ['createdAt', 'updatedAt']
    list_editable = ['price']