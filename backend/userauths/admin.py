from django.contrib import admin

from userauths.models import User, SuperUser, Profile, Team, Payment

class TeamInline(admin.TabularInline):
    model = Team
    extra = 0

class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'national_code', 'phone_number', 'username', 'email')
    inlines = [TeamInline]
class SuperUserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_number', 'username', 'email', 'is_superuser', 'ramz_shakhsi')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'league', 'active', 'birthday', 'country', 'city','shahrestan', 'address', 'name_of_team', 'number_of_teams', 'university_school_status', 'hotel_status', 'PDF_file', 'sarparast_confirmed', 'confirmed_rule', 'confirmed_information', 'order_status')
    list_editable = ( 'active','university_school_status', 'hotel_status', 'sarparast_confirmed', 'confirmed_rule', 'confirmed_information', 'order_status')



class TeamAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'national_code', 'phone_number', 'birthday', 'country', 'city', 'shahrestan', 'email')


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'payment_status', 'total_price', 'image', 'image2', 'image3', 'payment_check', 'payment_uncheck', 'payment_check_status')
    list_editable = ('payment_status', 'payment_check', 'payment_uncheck', 'payment_check_status')

admin.site.register(User, UserAdmin)
admin.site.register(SuperUser, SuperUserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Payment, PaymentAdmin)