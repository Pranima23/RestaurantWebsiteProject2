"""reservendine URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from api import views
from rest_framework_simplejwt import views as jwt_views


router = routers.DefaultRouter()
router.register(r'items', views.ItemView, 'item')
router.register(r'offers', views.OfferView, 'offer')
router.register(r'users', views.UserView, 'user')
router.register(r'categories', views.CategoryView, 'category')
router.register(r'ingredients', views.IngredientView, 'ingredient')
router.register(r'itemingredients', views.IngredientsInItemView, 'itemingredient')
router.register(r'tables', views.TableView, 'table')
router.register(r'seatplans', views.SeatPlanView, 'seatplan')
router.register(r'reservations', views.ReservationView, 'reservation')
router.register(r'orders', views.OrderView, 'order')
router.register(r'orderdetails', views.OrderDetailView, 'orderdetail')
router.register(r'invoices', views.InvoiceView, 'invoice')
router.register(r'invoicelineitems', views.InvoiceLineItemView, 'invoicelineitem')
router.register(r'paymentmethods', views.PaymentMethodView, 'paymentmethod')
router.register(r'payments', views.PaymentView, 'payment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)