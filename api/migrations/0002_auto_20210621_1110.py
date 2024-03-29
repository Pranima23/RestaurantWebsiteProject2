# Generated by Django 3.2.4 on 2021-06-21 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_ordered', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_reserved', models.DateTimeField(auto_now_add=True)),
                ('check_in_date', models.DateTimeField()),
                ('party_size', models.IntegerField(blank=True, null=True)),
                ('seat_plan', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.seatplan')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(blank=True, null=True)),
                ('special_instruction', models.TextField(blank=True, null=True)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.item')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.order')),
            ],
            options={
                'verbose_name': 'OrderDetail',
            },
        ),
        migrations.AddField(
            model_name='order',
            name='item',
            field=models.ManyToManyField(through='api.OrderDetail', to='api.Item'),
        ),
        migrations.AddField(
            model_name='order',
            name='offer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.offer'),
        ),
        migrations.AddField(
            model_name='order',
            name='reservationDetail',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.reservation'),
        ),
    ]
