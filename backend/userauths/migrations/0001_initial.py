# Generated by Django 4.2.9 on 2024-07-21 12:31

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import shortuuid.django_fields
import userauths.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('first_name', models.CharField(max_length=250)),
                ('last_name', models.CharField(max_length=250)),
                ('national_code', models.CharField(max_length=12, unique=True)),
                ('phone_number', models.CharField(max_length=11, unique=True, validators=[django.core.validators.RegexValidator(message='Phone number must be 11 digits', regex='^\\d{11}$')])),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('otp', models.CharField(blank=True, max_length=10, null=True)),
                ('uid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=45, max_length=50, prefix='', unique=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'User',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='SuperUser',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('ramz_shakhsi', models.CharField(blank=True, max_length=1000, null=True)),
                ('sid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=45, max_length=50, prefix='', unique=True)),
            ],
            options={
                'verbose_name': 'Superuser',
            },
            bases=('userauths.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=250)),
                ('last_name', models.CharField(max_length=250)),
                ('national_code', models.CharField(max_length=13, unique=True)),
                ('phone_number', models.CharField(max_length=11, unique=True, validators=[django.core.validators.RegexValidator(message='Phone number must be 11 digits', regex='^\\d{11}$')])),
                ('birthday', models.CharField(max_length=15)),
                ('country', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('shahrestan', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('address', models.CharField(max_length=1000)),
                ('update', models.DateTimeField(auto_now=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('tid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=19, max_length=20, prefix='', unique=True)),
                ('cant_update_after_register', models.CharField(choices=[('can_update', 'Can_update'), ('cant_update', 'Cant_update')], default='can_update', max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teamUser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Team member',
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('birthday', models.CharField(max_length=15)),
                ('country', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('shahrestan', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=2000)),
                ('zip_code', models.CharField(max_length=40)),
                ('name_of_team', models.CharField(max_length=300)),
                ('number_of_teams', models.IntegerField(default=0)),
                ('university_school_status', models.CharField(choices=[('school', 'School'), ('university', 'University')], default='university', max_length=100)),
                ('hotel_status', models.BooleanField(default=False)),
                ('PDF_file', models.FileField(blank=True, upload_to=userauths.models.user_directory_path, validators=[userauths.models.file_size, django.core.validators.FileExtensionValidator(['pdf'])])),
                ('sarparast_confirmed', models.BooleanField(default=False)),
                ('confirmed_rule', models.BooleanField(default=False)),
                ('confirmed_information', models.BooleanField(default=False)),
                ('order_status', models.CharField(choices=[('pendingـpayment', 'Pendingـpayment'), ('waitingـforـpaymentـconfirmation', 'Waitingـforـpaymentـconfirmation'), ('register', 'Register')], default='pendingـpayment', max_length=100)),
                ('update', models.DateTimeField(auto_now=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('pid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=45, max_length=60, prefix='', unique=True)),
                ('cant_update_after_register', models.CharField(choices=[('can_update', 'Can_update'), ('cant_update', 'Cant_update')], default='can_update', max_length=50)),
                ('league', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_league', to='core.league')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_status', models.CharField(choices=[('paid', 'Paid'), ('unPaid', 'UnPaid')], default='unPaid', max_length=50)),
                ('total_price', models.DecimalField(blank=True, decimal_places=0, default=0.0, max_digits=12)),
                ('member_sub_price', models.DecimalField(blank=True, decimal_places=0, default=0.0, max_digits=12)),
                ('hotel_sub_price', models.DecimalField(blank=True, decimal_places=0, default=0.0, max_digits=12)),
                ('image', models.FileField(blank=True, null=True, upload_to=userauths.models.user_directory_path)),
                ('image2', models.FileField(blank=True, null=True, upload_to=userauths.models.user_directory_path)),
                ('image3', models.FileField(blank=True, null=True, upload_to=userauths.models.user_directory_path)),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('payment_updated', models.DateTimeField(auto_now=True)),
                ('payid', shortuuid.django_fields.ShortUUIDField(alphabet='abcdefghijklmnopqrstuvwxyz1234567890', length=30, max_length=60, prefix='', unique=True)),
                ('orders_status', models.CharField(choices=[('pendingـpayment', 'Pendingـpayment'), ('waitingـforـpaymentـconfirmation', 'Waitingـforـpaymentـconfirmation'), ('register', 'Register')], default='pendingـpayment', max_length=100)),
                ('payment_check', models.BooleanField(default=False)),
                ('payment_uncheck', models.BooleanField(default=False)),
                ('payment_check_status', models.CharField(choices=[('accept', 'Accept'), ('reject', 'Reject'), ('notseen', 'Notseen')], default='notseen', max_length=50)),
                ('cant_update_after_register', models.CharField(choices=[('can_update', 'Can_update'), ('cant_update', 'Cant_update')], default='can_update', max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='paymentsUser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Payment transaction',
            },
        ),
    ]