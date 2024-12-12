# Generated by Django 4.2.9 on 2024-07-21 12:31

from django.db import migrations, models
import shortuuid.django_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('image', models.FileField(blank=True, default='hotel.jpg', null=True, upload_to='hotel')),
                ('active', models.BooleanField(default=True)),
                ('hid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=45, max_length=45, prefix='', unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(max_length=500000)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('price_per_night', models.DecimalField(decimal_places=0, default=0.0, max_digits=12)),
                ('price_multi_nights', models.DecimalField(decimal_places=0, default=0.0, max_digits=12)),
                ('datestart', models.CharField(blank=True, max_length=12, null=True)),
                ('dateend', models.CharField(blank=True, max_length=12, null=True)),
            ],
            options={
                'verbose_name_plural': 'Hotel',
            },
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('image', models.FileField(blank=True, default='league.jpg', null=True, upload_to='league')),
                ('active', models.BooleanField(default=True)),
                ('lid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=60, max_length=60, prefix='', unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'League',
                'ordering': ['-title'],
            },
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=700)),
                ('image', models.FileField(blank=True, null=True, upload_to='news')),
                ('content', models.TextField(blank=True, max_length=100000000, null=True)),
                ('active', models.BooleanField(default=True)),
                ('nid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=60, max_length=60, prefix='', unique=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'News',
                'ordering': ['-title'],
            },
        ),
        migrations.CreateModel(
            name='PricePerMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=0, default=0.0, max_digits=12)),
                ('pid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=60, max_length=60, prefix='', unique=True)),
            ],
            options={
                'verbose_name_plural': 'Price for one Member',
            },
        ),
    ]