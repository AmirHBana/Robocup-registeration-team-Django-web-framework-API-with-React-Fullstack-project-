from django.db import models
from shortuuid.django_fields import ShortUUIDField
from PIL import Image
from io import BytesIO
from django.core.files.storage import default_storage


class League(models.Model):
    title = models.CharField(max_length=500)
    image = models.FileField(upload_to='league', default="league.jpg", blank=True, null=True)
    active = models.BooleanField(default=True)
    lid = ShortUUIDField(unique=True, length=60, alphabet='abcdefghijklmnopqrstuvwxyz1234567890')
    date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "League"
        ordering = ['-title']

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         image = Image.open(self.image)
    #         if image.format != 'JPEG':
    #             image = image.convert('RGB')
    #
    #         # Compress the image
    #         with BytesIO() as output:
    #             image.save(output, format='JPEG', quality=22, optimize=True)
    #             output.seek(0)
    #
    #             # Save the compressed image data to the file field
    #             self.image.save(self.image.name, output, save=False)
    #
    #     super(League, self).save(*args, **kwargs)


class Hotel(models.Model):
    title = models.CharField(max_length=250)
    image = models.FileField(upload_to='hotel', default="hotel.jpg", blank=True , null=True)
    active = models.BooleanField(default=True)
    hid = ShortUUIDField(unique=True, length=45, alphabet='abcdefghijklmnopqrstuvwxyz1234567890')
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=500000)
    updated = models.DateTimeField(auto_now=True)

    # Price per person for 3 or 4 days
    price_per_night = models.DecimalField(decimal_places=0, max_digits=12, default=0.00)
    price_multi_nights = models.DecimalField(decimal_places=0, max_digits=12, default=0.00)

    # az tarikheh 1403/11/22
    datestart = models.CharField(max_length=12, null=True, blank=True)

    # az tarikheh 1403/11/22
    dateend = models.CharField(max_length=12, null=True, blank=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural= "Hotel"



class News(models.Model):
    title = models.CharField(max_length=700)
    image = models.FileField(upload_to='news', blank=True , null=True)
    content = models.TextField(max_length=100000000, blank=True , null=True)
    active = models.BooleanField(default=True)
    nid = ShortUUIDField(unique=True, length=60, alphabet='abcdefghijklmnopqrstuvwxyz1234567890')
    date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural= "News"
        ordering = ['-title']

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
        super(News, self).save(*args, **kwargs)            


class PricePerMember(models.Model):
    price = models.DecimalField(decimal_places=0, max_digits=12, default=0.00)
    pid = ShortUUIDField(unique=True, length=60, alphabet='abcdefghijklmnopqrstuvwxyz1234567890')

    def __str__(self):
        return self.price

    class Meta:
        verbose_name_plural = "Price for one Member"


