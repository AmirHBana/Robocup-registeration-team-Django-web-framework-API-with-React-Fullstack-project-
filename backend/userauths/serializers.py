from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from userauths.models import User, SuperUser, Profile, Payment, Team
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from core.models import League


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['phone_number'] = user.phone_number
        token['email'] = user.email
        token['username'] = user.username


        return token


class LoginUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'username',
            'password',
        ]

class ResetUserPasswordSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password3 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'password',
            'id',
            'password2',
            'password3',
        ]

    def validate(self, attrs):
        if attrs['password2'] != attrs['password3']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد"})
        return attrs

class ForgotUserPasswordSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password3 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = [
            'national_code',
            'username',
            'email',
            'password2',
            'password3',
        ]
    def validate(self, attrs):
        if attrs['password2'] != attrs['password3']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد"})
        return attrs


class ForgotSuperUserPasswordSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password3 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = [
            'national_code',
            'username',
            'email',
            'password2',
            'password3',
        ]
    def validate(self, attrs):
        if attrs['password2'] != attrs['password3']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد"})
        return attrs


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'national_code',
            'phone_number',
            # 'username',
            'email',
            'password',
            'password2',
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد"})
        return attrs


class RegisterSuperUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = SuperUser
        fields = (
            'first_name',
            'last_name',
            'national_code',
            'phone_number',
            'ramz_shakhsi',
            'email',
            # 'is_superuser',
            'password',
            'password2',

        )
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد"})
        return attrs


class LoginSuperUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = SuperUser
        fields = [
            'username',
            'password',
        ]

class ResetSuperUserPasswordSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password3 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = SuperUser
        fields = [
            'password',
            'id',
            'password2',
            'password3',
        ]

    def validate(self, attrs):
        if attrs['password2'] != attrs['password3']:
            raise serializers.ValidationError({"password": "رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد "})
        return attrs


# for user
class RegisterProfileUserSerializer(serializers.ModelSerializer):
    # league = serializers.PrimaryKeyRelatedField(queryset=League.objects.all())

    class Meta:
        model = Profile
        fields = [
            'id',
            'league',
            'birthday',
            'country',
            'city',
            'shahrestan',
            'address',
            'zip_code',
            'name_of_team',
            'number_of_teams',
            'university_school_status',
            'hotel_status',
            'PDF_file',
            'sarparast_confirmed',
            'confirmed_rule',
            'confirmed_information',
            'order_status',
            'pid',
        ]

    def create(self, validated_data):
        league = validated_data.pop('league')
        profile = Profile.objects.create(league=league, **validated_data)
        return profile

    def __init__(self, *args, **kwargs):
        super(RegisterProfileUserSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # We use depth because of the of the ForeignKey  expand the FK and get all information
            # If you wanne get the all information of a ForeignKey use depth and number for the layers
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class UpdateProfileUserSerializer(serializers.ModelSerializer):
    # league = serializers.PrimaryKeyRelatedField(queryset=League.objects.all())

    class Meta:
        model = Profile
        fields = [
            'id',
            'league',
            'birthday',
            'country',
            'city',
            'shahrestan',
            'address',
            'zip_code',
            'name_of_team',
            'number_of_teams',
            'university_school_status',
            'hotel_status',
            'PDF_file',
            'order_status',
            'pid',
        ]

    def update(self, instance, validated_data):
        league = validated_data.get('league')
        if league:
            instance.league = league
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def __init__(self, *args, **kwargs):
        super(UpdateProfileUserSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            # We use depth because of the of the ForeignKey  expand the FK and get all information
            # If you wanne get the all information of a ForeignKey use depth and number for the layers
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3



class TeamStatusPreviewBySuperUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'name_of_team',
            'order_status',
            'pid',
        ]



# class TeamStatusPreviewBySuperUserTwoSerializer(serializers.ModelSerializer):
#     user = serializers.SerializerMethodField()
#     team = serializers.SerializerMethodField()
#     payment = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Profile
#         fields = '__all__'
#
#     def get_user(self, obj):
#         user = obj.user
#         return {
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'national_code': user.national_code,
#             'phone_number': user.phone_number,
#             'email': user.email
#         }
#
#     def get_team(self, obj):
#         teams = Team.objects.filter(user=obj.user)
#         team_data = []
#         for team in teams:
#             team_data.append({
#                 'first_name': team.first_name,
#                 'last_name': team.last_name,
#                 'national_code': team.national_code,
#                 'phone_number': team.phone_number,
#                 'birthday': team.birthday,
#                 'country': team.country,
#                 'city': team.city,
#                 'shahrestan': team.shahrestan,
#                 'email': team.email,
#                 'address': team.address,
#                 'tid': team.tid,
#             })
#         return team_data
#
#     def get_payment(self, obj):
#         payments = Payment.objects.filter(user=obj.user)
#         payment_data = []
#         for payment in payments:
#             payment_data.append({
#                 'payment_status': payment.payment_status,
#                 'total_price': payment.total_price,
#                 'member_sub_price': payment.member_sub_price,
#                 'hotel_sub_price': payment.hotel_sub_price,
#                 'image':  payment.image.url if payment.image else None,
#                 'image2':  payment.image2.url if payment.image2 else None,
#                 'image3':  payment.image3.url if payment.image3 else None,
#                 'payment_date': payment.payment_date,
#                 'payid': payment.payid,
#                 'orders_status': payment.orders_status,
#                 'payment_check_status': payment.payment_check_status,
#                 'cant_update_after_register': payment.cant_update_after_register,
#             })
#         return payment_data


class TeamStatusPreviewBySuperUserTwoSerializer(serializers.ModelSerializer):
    league = serializers.CharField(source='league.title')
    user = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    payment = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'league',
            'active',
            'birthday',
            'country',
            'city',
            'shahrestan',
            'address',
            'zip_code',
            'name_of_team',
            'number_of_teams',
            'university_school_status',
            'hotel_status',
            'PDF_file',
            'order_status',
            'update',
            'date',
            'pid',
            'team',
            'payment',
            'user',
        ]

    def get_user(self, obj):
        user = obj.user
        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'national_code': user.national_code,
            'phone_number': user.phone_number,
            'email': user.email
        }

    def get_team(self, obj):
        teams = Team.objects.filter(user=obj.user)
        team_data = []
        for team in teams:
            team_data.append({
                'first_name': team.first_name,
                'last_name': team.last_name,
                'national_code': team.national_code,
                'phone_number': team.phone_number,
                'birthday': team.birthday,
                'country': team.country,
                'city': team.city,
                'shahrestan': team.shahrestan,
                'email': team.email,
                'address': team.address,
                'tid': team.tid,
            })
        return team_data

    def get_payment(self, obj):
        payments = Payment.objects.filter(user=obj.user)
        request = self.context.get('request')
        payment_data = []
        for payment in payments:
            image_url = request.build_absolute_uri(payment.image.url) if payment.image else None
            image2_url = request.build_absolute_uri(payment.image2.url) if payment.image2 else None
            image3_url = request.build_absolute_uri(payment.image3.url) if payment.image3 else None
            payment_data.append({
                'payment_status': payment.payment_status,
                'total_price': payment.total_price,
                'member_sub_price': payment.member_sub_price,
                'hotel_sub_price': payment.hotel_sub_price,
                'image': image_url,
                'image2': image2_url,
                'image3': image3_url,
                'payment_date': payment.payment_date,
                'payid': payment.payid,
                'orders_status': payment.orders_status,
                'payment_check_status': payment.payment_check_status,
                'cant_update_after_register': payment.cant_update_after_register,
            })
        return payment_data


class TeamStatusPreviewByMainUserSerializer(serializers.ModelSerializer):
    league_title = serializers.CharField(source='league.title')


    class Meta:
        model = Profile
        fields = [
            'league_title',
            'name_of_team',
        ]

class SearchTeamforHomePageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            'name_of_team',
        ]



# You can then access the related fields in your serializer
class PaymentUserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'payment_status',
            'total_price',
            'payid',
            'orders_status',
            'payment_check_status',
        ]

class SendPicturePaymentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'total_price',
            'member_sub_price',
            'hotel_sub_price',
        ]

class PaymentUserStatustwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'name_of_team',
            'order_status',
        ]


# # Complete information member by User for example 4 member for one user by forign key
class CompleteInformationMemberByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [
            'id',
            'first_name',
            'last_name',
            'national_code',
            'phone_number',
            'birthday',
            'country',
            'city',
            'shahrestan',
            'email',
            'address',
            'tid',
        ]


class SendPicturePaymentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'total_price',
            'member_sub_price',
            'hotel_sub_price',
            'payid',
        ]

class SendPicturePaymenttwoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'image',
            'image2',
            'image3',
        ]

# Super User  confirm payment
class ConfirmPaymentSuperUserSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.email')

    class Meta:
        model = Payment
        fields = [
            'user',
            'payid',
            'total_price',
        ]


class ConfirmPaymentSuperUserAcceptOrRejectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = [
            'payid',
            'payment_check',
            'payment_uncheck',
        ]



#
# class ProfileSerializer(serializers.ModelSerializer):
#     league = serializers.CharField(source='league.title')
#
#     class Meta:
#         model = Profile
#         fields = [
#             'league',
#             'birthday',
#             'country',
#             'city',
#             'shahrestan',
#             'address',
#             'name_of_team',
#             'number_of_teams',
#             # 'number_of_Sarparasteh_team',
#             'university_school_status',
#             'hotel_status',
#             'PDF_file',
#             'order_status',
#             'date',
#             'pid',
#         ]
#
# class PaymentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Payment
#         fields = [
#             'payment_status',
#             'total_price',
#             'member_sub_price',
#             'hotel_sub_price',
#             'image',
#             'image2',
#             'image3',
#             'payment_date',
#             'payid',
#             'payment_check_status',
#         ]
#
# class TeamSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Team
#         fields = [
#             'first_name',
#             'last_name',
#             'national_code',
#             'phone_number',
#             'birthday',
#             'country',
#             'city',
#             'shahrestan',
#             'email',
#             'address',
#             'date',
#             'tid',
#         ]


class ConfirmPaymentSuperUserTwoSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            'user',
            'total_price',
            'payment_date',
            'payid',
            'orders_status',
            'payment_check_status',
            'payment_check',
        ]

    def get_user(self, obj):
        user = obj.user
        profile = user.profile
        team = Team.objects.filter(user=user).first()
        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'national_code': user.national_code,
            'phone_number': user.phone_number,
            'email': user.email,
            'profile_details': {
                'birthday': profile.birthday,
                'country': profile.country,
                'city': profile.city,
                'shahrestan': profile.shahrestan,
                'address': profile.address,
                'zip_code': profile.zip_code,
                'name_of_team': profile.name_of_team,
            },
            'team_details': {
                'first_name': team.first_name,
                'last_name': team.last_name,
                'national_code': team.national_code,
                'phone_number': team.phone_number,
                'birthday': team.birthday,
                'country': team.country,
                'city': team.city,
                'address': team.address,
            } if team else None,
        }

class NestedPaymentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    teams = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            'user',
            'profile',
            'teams',
            'payment_status',
            'total_price',
            'member_sub_price',
            'hotel_sub_price',
            'image',
            'image2',
            'image3',
            'payment_date',
            'payid',
            'orders_status',
            'payment_check_status',
        ]

    def get_user(self, obj):
        user = obj.user
        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'national_code': user.national_code,
            'phone_number': user.phone_number,
            'email': user.email,
        }

    def get_profile(self, obj):
        profile = obj.user.profile
        return {
            'birthday': profile.birthday,
            'league': profile.league.title,
            'name_of_team': profile.name_of_team,
            'number_of_teams': profile.number_of_teams,
            'country': profile.country,
            'city': profile.city,
            'shahrestan': profile.shahrestan,
            'address': profile.address,
            'zip_code': profile.zip_code,
            'university_school_status': profile.university_school_status,
            'hotel_status': profile.hotel_status,
            'order_status': profile.order_status,
            'date': profile.date,
        }

    def get_teams(self, obj):
        teams = Team.objects.filter(user=obj.user).values('first_name', 'last_name', 'national_code', 'email', 'phone_number', 'birthday', 'country', 'city', 'address')
        return teams



