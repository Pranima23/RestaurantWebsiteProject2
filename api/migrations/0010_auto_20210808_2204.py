# Generated by Django 3.2.4 on 2021-08-08 16:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_item_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoicelineitem',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='invoicelineitem',
            name='order_detail',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.orderdetail'),
        ),
    ]