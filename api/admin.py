from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _
# from import_export.admin import ImportExportModelAdmin
from .models import *

#User
class CustomUserAdmin(UserAdmin):    
    
    # model = User
    # fieldsets = UserAdmin.fieldsets + (
    #     (None, {'fields': ('phone_no',)}),
    # )
    # add_fieldsets = UserAdmin.add_fieldsets + (
    #     (None, {'fields': ('phone_no',)}),
    # )
    # list_display = UserAdmin.list_display + ('phone_no',)
    # search_fields = ('email', 'phone_no')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone_no')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_no', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'phone_no', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name', 'phone_no')
    ordering = ('email',)

#Item
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'cost', 'categories', 'ingredients', 'offer', 'discount', 'cost_after_discount')

#Category
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_category')

#Ingredient
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name',)

class IngredientsInItemAdmin(admin.ModelAdmin):
    list_display = ('item', 'ingredient', 'quantity_of_ingredient',)

#Offer
class OfferAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount_rate')

#Table and Seat Plan
class TableAdmin(admin.ModelAdmin):
    list_display = ('table_no', 'party_size_capacity')

class SeatPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'party_size_capacity', 'tables')

#Reservation
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_reserved', 'check_in_date', 'party_size', 'seat_plan')

#Order
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'date_ordered', 'reservation_detail', 'offer', 'order_details', 'order_total_cost', 'total_cost_after_discount')

#Order Detail
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'item', 'quantity', 'order_item_cost', 'order_item_cost_after_discount', 'special_instruction')

#Invoice 
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('invoice_no', 'invoice_date', 'invoice_line_items', 'invoice_amount', 'invoice_amount_after_discount')

#Invoice Line Item
class InvoiceLineItemAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'order_detail')

#Payment Method
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('id', 'payment_method_name')

#Payment
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'payment_date', 'invoice', 'payment_amount', 'payment_method')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(IngredientsInItem, IngredientsInItemAdmin)
admin.site.register(Offer, OfferAdmin)
admin.site.register(Table, TableAdmin)
admin.site.register(SeatPlan, SeatPlanAdmin)
admin.site.register(Reservation, ReservationAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(Invoice, InvoiceAdmin)
admin.site.register(InvoiceLineItem, InvoiceLineItemAdmin)
admin.site.register(PaymentMethod, PaymentMethodAdmin)
admin.site.register(Payment, PaymentAdmin)