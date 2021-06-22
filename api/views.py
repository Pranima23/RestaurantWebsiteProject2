from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics 
from .serializers import *
from .models import *

# Create your views here.
def api(request):
    return HttpResponse('API')

#User view
class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#Offer view
class OfferView(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

#Category view
class CategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

#Ingredient view
class IngredientView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

#Item view
class ItemView(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

#Ingredients in Item view
class IngredientsInItemView(generics.ListCreateAPIView):
    queryset = IngredientsInItem.objects.all()
    serializer_class = IngredientsInItemSerializer

#Table and Seat Plan views
class TableView(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class SeatPlanView(generics.ListCreateAPIView):
    queryset = SeatPlan.objects.all()
    serializer_class = SeatPlanSerializer

#Reservation view
class ReservationView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

#Order view
class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

#OrderDetail view
class OrderDetailView(generics.ListCreateAPIView):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer

#Invoice view
class InvoiceView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceLineItemView(generics.ListCreateAPIView):
    queryset = InvoiceLineItem.objects.all()
    serializer_class = InvoiceLineItemSerializer

#Payment views
class PaymentMethodView(generics.ListCreateAPIView):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class PaymentView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer