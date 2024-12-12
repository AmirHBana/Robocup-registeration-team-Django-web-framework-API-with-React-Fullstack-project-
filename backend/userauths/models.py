
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from shortuuid.django_fields import ShortUUIDField
from core.models import League
from PIL import Image
from io import BytesIO
from django.core.validators import FileExtensionValidator, RegexValidator
from django.core.exceptions import ValidationError

# from django.core.files.base import ContentFile
# import io
# from userauths.utils import compress_file
# import PyPDF2
# from PyPDF2 import PdfWriter, PdfFileWriter, PdfFileReader


def user_directory_path(instance, filename):

    ext = filename.split('.')[-1]

    filename = '%s.%s' % (instance.user.id, ext)

    return 'user_{0}/{1}'.format(instance.user.id, filename)


class User(AbstractUser):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    national_code = models.CharField(max_length=12, unique=True)
    phone_number = models.CharField(max_length=11, unique=True, validators=[
        RegexValidator(regex='^\d{11}$', message='Phone number must be 11 digits')
    ])
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=10, null=True, blank=True)
    uid = ShortUUIDField(length=80, max_length=100, alphabet='abcdefghijklmnopqrstuvwxyz1234567890', unique=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'User'

# phone number is equal to username so in form login phone number should work
@receiver(pre_save, sender=User)
def fill_username(sender, instance, **kwargs):
    if not instance.username:
        instance.username = instance.phone_number



class SuperUser(User):
    ramz_shakhsi = models.CharField(max_length=1000, null=True, blank=True)
    sid = ShortUUIDField(length=45, max_length=50, alphabet='abcdefghijklmnopqrstuvwxyz1234567890',
                         unique=True)

    class Meta:
        verbose_name = 'Superuser'

@receiver(pre_save, sender=SuperUser)
def fill_super_username(sender, instance, **kwargs):
    if not instance.username:
        instance.username = instance.phone_number
        instance.is_staff = True

def file_size(value):  # add this to some file where you can import it from
    limit = 5 * 1024 * 1024
    if value.size > limit:
        raise ValidationError('File too large. Size should not exceed 5 MiB.')

# profile and complete the information header of team
class Profile(models.Model):
    UNI_STATUS = (
        ('school', 'School'),
        ('university', 'University'),
    )

    ORDER_STATUS = (
        ('pendingـpayment', 'Pendingـpayment'),
        ('waitingـforـpaymentـconfirmation', 'Waitingـforـpaymentـconfirmation'),
        ('register', 'Register'),
    )

    UPDATE_STATUS = (
        ('can_update', 'Can_update'),
        ('cant_update', 'Cant_update'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='user_league', null=True, blank=True)  # Make league nullable
    active = models.BooleanField(default=True)
    birthday = models.CharField(max_length=15)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    shahrestan = models.CharField(max_length=50)
    address = models.CharField(max_length=2000)
    zip_code = models.CharField(max_length=40)
    name_of_team = models.CharField(max_length=300)
    number_of_teams = models.IntegerField(default=0)
    # number_of_Sarparasteh_team = models.IntegerField(default=1)
    university_school_status = models.CharField(max_length=100, choices=UNI_STATUS, default='university')
    hotel_status = models.BooleanField(default=False)
    PDF_file = models.FileField(upload_to=user_directory_path, blank=True, validators=[file_size, FileExtensionValidator(['pdf'])])

    sarparast_confirmed = models.BooleanField(default=False)
    confirmed_rule = models.BooleanField(default=False)
    confirmed_information = models.BooleanField(default=False)

    order_status = models.CharField(max_length=100, choices=ORDER_STATUS, default='pendingـpayment')

    update = models.DateTimeField(auto_now=True)
    date = models.DateField(auto_now_add=True)
    pid = ShortUUIDField(length=45, max_length=60, alphabet='abcdefghijklmnopqrstuvwxyz1234567890', unique=True)
    cant_update_after_register = models.CharField(max_length=50, choices=UPDATE_STATUS, default='can_update')

    def __str__(self):
        return self.name_of_team




def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
post_save.connect(create_user_profile, sender=SuperUser)
post_save.connect(save_user_profile, sender=SuperUser)


class Team(models.Model):
    UPDATE_STATUS = (
        ('can_update', 'Can_update'),
        ('cant_update', 'Cant_update'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='teamUser')
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    national_code = models.CharField(max_length=13, unique=True)
    phone_number = models.CharField(max_length=11, unique=True, validators=[
        RegexValidator(regex='^\d{11}$', message='Phone number must be 11 digits')
    ])
    birthday = models.CharField(max_length=15)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    shahrestan = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=1000)
    update = models.DateTimeField(auto_now=True)
    date = models.DateField(auto_now_add=True)
    tid = ShortUUIDField(length=19, max_length=20, alphabet='abcdefghijklmnopqrstuvwxyz1234567890', unique=True)
    cant_update_after_register = models.CharField(max_length=50, choices=UPDATE_STATUS, default='can_update')

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Team member'


class Payment(models.Model):
    PAYMENT_STATUS = (
        ('paid', 'Paid'),
        ('unPaid', 'UnPaid'),
    )
    PAYMENT_CHECK_STATUS = (
        ('accept', 'Accept'),
        ('reject', 'Reject'),
        ('notseen', 'Notseen'),
    )
    ORDERS_STATUS = (
        ('pendingـpayment', 'Pendingـpayment'),
        ('waitingـforـpaymentـconfirmation', 'Waitingـforـpaymentـconfirmation'),
        ('register', 'Register'),
    )
    UPDATE_STATUS = (
        ('can_update', 'Can_update'),
        ('cant_update', 'Cant_update'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='paymentsUser')
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS, default='unPaid')

    # for all the number of the payment
    total_price = models.DecimalField(decimal_places=0, max_digits=12, default=0.00, blank=True)
    # for calculate the member * tedad + sarparast * tedad * 1.5
    member_sub_price = models.DecimalField(decimal_places=0, max_digits=12, default=0.00, blank=True)
    # for caculate the hotel price for 4 night * tedad member + sarparast team

    hotel_sub_price = models.DecimalField(decimal_places=0, max_digits=12, default=0.00, blank=True)

    image = models.FileField(upload_to=user_directory_path, blank=True, null=True)
    image2 = models.FileField(upload_to=user_directory_path, blank=True, null=True)
    image3 = models.FileField(upload_to=user_directory_path, blank=True, null=True)

    payment_date = models.DateTimeField(auto_now_add=True)
    payment_updated = models.DateTimeField(auto_now=True)
    payid = ShortUUIDField(length=30, max_length=60, alphabet='abcdefghijklmnopqrstuvwxyz1234567890', unique=True)
    orders_status = models.CharField(max_length=100, choices=ORDERS_STATUS, default='pendingـpayment')


    # check by superuser to accept the payment
    payment_check = models.BooleanField(default=False)
    # uncheck by superuser to reject the payment
    payment_uncheck = models.BooleanField(default=False)

    payment_check_status = models.CharField(max_length=50, choices=PAYMENT_CHECK_STATUS, default='notseen')
    cant_update_after_register = models.CharField(max_length=50, choices=UPDATE_STATUS, default='can_update')


    def __str__(self):
        return self.payid

    def save(self, *args, **kwargs):
        if self.image:
            image = Image.open(self.image)
            if image.format != 'JPEG':
                image = image.convert('RGB')

            # Compress the image
            with BytesIO() as output:
                image.save(output, format='JPEG', quality=22, optimize=True)
                output.seek(0)

                # Save the compressed image data to the file field
                self.image.save(self.image.name, output, save=False)

        if self.image2:
            image2 = Image.open(self.image2)
            if image2.format != 'JPEG':
                image2 = image2.convert('RGB')

            # Compress the image
            with BytesIO() as output:
                image2.save(output, format='JPEG', quality=22, optimize=True)
                output.seek(0)

                # Save the compressed image data to the file field
                self.image2.save(self.image2.name, output, save=False)

        if self.image3:
            image3 = Image.open(self.image3)
            if image3.format != 'JPEG':
                image3 = image3.convert('RGB')

            # Compress the image
            with BytesIO() as output:
                image3.save(output, format='JPEG', quality=22, optimize=True)
                output.seek(0)

                # Save the compressed image data to the file field
                self.image3.save(self.image3.name, output, save=False)

        super(Payment, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Payment transaction'

