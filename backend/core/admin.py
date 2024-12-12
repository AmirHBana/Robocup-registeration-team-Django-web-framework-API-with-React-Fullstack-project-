from django.contrib import admin

from core.models import League, Hotel, News, PricePerMember

class LeagueAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'active', 'date', 'updated')
    list_editable = ('active',)

class HotelAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'active','price_per_night', 'price_multi_nights' , 'date', 'updated')
    list_editable = ('active',)

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'active', 'date', 'updated')
    list_editable = ('active',)

class PricePerMemberAdmin(admin.ModelAdmin):
    list_display = ('price', )



admin.site.register(League, LeagueAdmin)
admin.site.register(Hotel, HotelAdmin)
admin.site.register(News, NewsAdmin)
admin.site.register(PricePerMember, PricePerMemberAdmin)
