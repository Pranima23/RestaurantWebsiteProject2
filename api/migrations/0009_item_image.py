# Generated by Django 3.2.4 on 2021-07-12 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210621_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(null=True, upload_to='images'),
        ),
    ]
