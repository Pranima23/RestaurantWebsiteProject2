from rest_framework import serializers
from .models import *

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'url', 'email', 'password', 'phone_no', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions', 'last_login', 'date_joined']

#Offer Serializer
class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ['id', 'url', 'name', 'discount_rate']

#Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'url', 'name', 'parent_category']

#Ingredient Serializer
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'url', 'name']

#Item Serializer
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'url', 'name', 'image', 'cost', 'category', 'ingredient', 'ingredients', 'description', 'offer', 'discount', 'cost_after_discount']

#Ingredients in Item Serializer
class IngredientsInItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientsInItem
        fields = ['id', 'url', 'item', 'ingredient', 'quantity_of_ingredient']

#Table and Seat Plan serializers
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['table_no', 'url', 'party_size_capacity']

class SeatPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeatPlan
        fields = ['id', 'url', 'party_size_capacity', 'table']

#Reservation Serializer
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'url', 'date_reserved', 'check_in_date', 'party_size', 'seat_plan', 'customer']

#Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'url', 'date_ordered', 'reservation_detail', 'ordered_items', 'offer', 'order_total_cost', 'order_total_cost_after_discount', 'discount', 'total_cost_after_discount']

#OrderDetail Serializer
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['id', 'order', 'url', 'item', 'quantity', 'special_instruction', 'order_item_cost', 'order_item_cost_after_discount']

#Invoice Serializers
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ['invoice_no', 'url', 'invoice_date', 'order', 'invoice_amount', 'invoice_amount_after_discount']

class InvoiceLineItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceLineItem
        fields = ['invoice', 'url', 'order_detail']

#Payment Serializers
class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'url', 'payment_method_name']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['url', 'payment_date', 'invoice', 'payment_method', 'customer', 'payment_amount']
