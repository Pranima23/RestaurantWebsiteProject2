from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _

#User model
class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    phone_no = models.CharField(max_length=10, unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

#Offer model
class Offer(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    discount_rate = models.DecimalField(help_text="in percent", max_digits=4, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name

#Category model
class Category(models.Model):
    class Meta:
        verbose_name_plural = 'Categories'

    name = models.CharField(max_length=50, null=True, blank=True)
    parent_category = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name



#Ingredient model
class Ingredient(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name


#Item model
class Item(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    cost = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    category = models.ManyToManyField(Category)
    image = models.ImageField(upload_to="images", null=True)
    description = models.TextField(null=True, blank=True)
    ingredient = models.ManyToManyField(Ingredient, through='IngredientsInItem')
    offer = models.ForeignKey(Offer, on_delete=models.SET_NULL, null=True, blank=True)
    
    @property
    def discount(self):
        if self.offer:
            return self.cost * self.offer.discount_rate / 100
        else:
            return 0

    @property
    def cost_after_discount(self):
       return self.cost - self.discount

    def __str__(self):
        return self.name
    
    def categories(self):
        if self.category:
            return ', '.join([c.name for c in self.category.all()])

    @property
    def ingredients(self):
        if self.ingredient:
            return ', '.join([i.name for i in self.ingredient.all()])

#Ingredients in Item model
class IngredientsInItem(models.Model):
    class Meta:
        verbose_name = 'IngredientsInItem'
        
    item = models.ForeignKey(Item, on_delete=models.CASCADE, null=True, blank=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, null=True, blank=True)
    quantity_of_ingredient = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)


#Table and Seat Plan models
class Table(models.Model):
    table_no = models.IntegerField(primary_key=True)
    party_size_capacity = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return 'Table ' + str(self.table_no)

class SeatPlan(models.Model):
    party_size_capacity = models.IntegerField(null=True, blank=True)
    table = models.ManyToManyField(Table)

    def __str__(self):
        return 'Seat Plan ' + str(self.id)

    def tables(self):
        if self.table:
            return ', '.join([str(t.table_no) for t in self.table.all()])

#Reservation model
class Reservation(models.Model):
    date_reserved = models.DateTimeField(auto_now_add=True)
    check_in_date = models.DateTimeField()
    party_size = models.IntegerField(null=True, blank=True)
    seat_plan = models.ForeignKey(SeatPlan, on_delete=models.DO_NOTHING, null=True, blank=True)
    customer = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return str(self.id)


#Order model
class Order(models.Model):
    date_ordered = models.DateTimeField(auto_now_add=True)
    reservation_detail = models.ForeignKey(Reservation, on_delete=models.DO_NOTHING, null=True, blank=True)
    ordered_items = models.ManyToManyField(Item, through='OrderDetail')
    offer = models.ForeignKey(Offer, on_delete=models.SET_NULL, null=True, blank=True)

    def order_details(self):
        if self.ordered_items:
            orderdetails = OrderDetail.objects.filter(order=self.id)
            return ', '.join([str(o) for o in orderdetails])

    @property
    def order_total_cost(self):
        if self.ordered_items:
            orderdetails = OrderDetail.objects.filter(order=self.id)
            return sum([item.order_item_cost for item in orderdetails])        
    @property
    def order_total_cost_after_discount(self):
        if self.ordered_items:
            orderdetails = OrderDetail.objects.filter(order=self.id)
            return sum([item.order_item_cost_after_discount for item in orderdetails])        

    @property
    def discount(self):
        if self.offer:
            return self.order_total_cost_after_discount * self.offer.discount_rate / 100
        else:
            return 0

    @property
    def total_cost_after_discount(self):
        return self.order_total_cost_after_discount - self.discount

    def __str__(self):
        return str(self.id)

#Order Detail model
class OrderDetail(models.Model):
    class Meta:
        verbose_name = 'OrderDetail'

    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING, null=True, blank=True)
    item = models.ForeignKey(Item, on_delete=models.DO_NOTHING, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    special_instruction = models.TextField(null=True, blank=True)

    @property
    def order_item_cost(self):
        if self.item is None:
            return "None"
        return self.quantity * self.item.cost

    @property
    def order_item_cost_after_discount(self):
        if self.item is not None:
             return self.quantity * self.item.cost_after_discount

#Invoice models
class Invoice(models.Model):
    invoice_no = models.AutoField(primary_key=True,)
    invoice_date = models.DateTimeField(auto_now_add=True)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING, blank=True, null=True)

    @property
    def invoice_amount(self):
        return self.order.order_total_cost

    @property
    def invoice_amount_after_discount(self):
        return self.order.total_cost_after_discount

    @property
    def invoice_line_items(self):
        invoice_items = InvoiceLineItem.objects.filter(invoice=self)
        return ', '.join([str(i.order_detail) for i in invoice_items])


class InvoiceLineItem(models.Model):
    order_detail = models.OneToOneField(OrderDetail, primary_key=True, on_delete=models.CASCADE)
    invoice = models.ForeignKey(Invoice, on_delete=models.DO_NOTHING, null=True, blank=True)

#Payment models
class PaymentMethod(models.Model):
    payment_method_name = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.payment_method_name

class Payment(models.Model):
    payment_date = models.DateTimeField(auto_now_add=True)
    invoice = models.OneToOneField(Invoice, on_delete=models.DO_NOTHING, null=True, blank=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.DO_NOTHING, null=True, blank=True)
    customer = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)

    @property
    def payment_amount(self):
        return self.invoice.invoice_amount_after_discount
