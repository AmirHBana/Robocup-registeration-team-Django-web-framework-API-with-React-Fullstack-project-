from decimal import Decimal

from django.db import transaction
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, AllowAny, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import League, PricePerMember, Hotel
from userauths.models import User, SuperUser, Profile, Payment, Team
from userauths.serializers import (RegisterUserSerializer, \
                                   LoginUserSerializer, ResetUserPasswordSerializer,
                                   RegisterSuperUserSerializer,
                                   LoginSuperUserSerializer, ResetSuperUserPasswordSerializer,
                                   ForgotUserPasswordSerializer, ForgotSuperUserPasswordSerializer,
                                   TeamStatusPreviewBySuperUserSerializer,
                                   TeamStatusPreviewByMainUserSerializer, PaymentUserStatusSerializer,
                                   PaymentUserStatustwoSerializer, SendPicturePaymentUserSerializer,
                                   SendPicturePaymenttwoUserSerializer, RegisterProfileUserSerializer,
                                   UpdateProfileUserSerializer, ConfirmPaymentSuperUserSerializer,
                                   CompleteInformationMemberByUserSerializer,
                                   SearchTeamforHomePageSerializer, NestedPaymentSerializer,
                                   ConfirmPaymentSuperUserAcceptOrRejectSerializer,
                                   TeamStatusPreviewBySuperUserTwoSerializer,
                                   )
from django.contrib.auth import authenticate, login
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import F
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.views import APIView
from django.db.models import Q


# class LoginUser(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
# 20 isAuthenticate shod Allowany



class LoginUser(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginUserSerializer
    queryset = User.objects.all()

    def generate_tokens(self, user):
        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token
        refresh_token['user_id'] = user.id
        refresh_token['user_uid'] = user.uid
        refresh_token['phone_number'] = user.phone_number
        refresh_token['username'] = user.username
        refresh_token['email'] = user.email
        refresh_token['is_staff'] = user.is_staff
        access_token['user_id'] = user.id
        access_token['user_uid'] = user.uid
        access_token['phone_number'] = user.phone_number
        access_token['username'] = user.username
        access_token['email'] = user.email
        access_token['is_staff'] = user.is_staff

        return {
            'refresh': str(refresh_token),
            'access': str(access_token),
        }

    def post(self, request):
        payload = request.data
        username = payload['username']
        password = payload['password']
        if User.objects.filter(username=username).exists():
            user = authenticate(request=request, username=username, password=password)
            if user is not None:
                login(request, user)
                tokens = self.generate_tokens(user)
                return Response(tokens, status=status.HTTP_200_OK)
            else:
                return Response({"message": "رمزعبور اشتباه است.دوباره تلاش کنید"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "لطفا ابتدا در سایت ثبت نام نمایید"}, status=status.HTTP_404_NOT_FOUND)


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data
        serializer = RegisterUserSerializer(data=payload)

        if serializer.is_valid():
            username = payload.get('username')
            email = payload.get('email')
            first_name = payload.get('first_name')
            last_name = payload.get('last_name')
            national_code = payload.get('national_code')
            phone_number = payload.get('phone_number')

            # Check if user with the same username or email already exists
            if User.objects.filter(username=username, email=email).exists():
                return Response({"error": "کاربری با مشخصات شما قبلا ثبت نام نموده"}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new user object with password
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                national_code=national_code,
                phone_number=phone_number,
                username=username,
                email=email
            )
            user.set_password(payload.get('password')) # Set the password for the user
            user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetUserPassword(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ResetUserPasswordSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data
        user = payload['id']
        user = User.objects.get(uid=user)
        serializer = self.get_serializer(user, data=request.data)

        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            password2 = serializer.validated_data.get('password2')
            password3 = serializer.validated_data.get('password3')

            if not user.check_password(password):
                return Response({'error': 'رمزعبور اشتباه است. لطفا دوباره تلاش فرمایید'}, status=status.HTTP_400_BAD_REQUEST)

            if password2 == password3:
                user.set_password(password2)
                user.save()
                return Response({'message': 'رمزعبور شما با موفقیت تغییر کرد'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterSuperUser(generics.CreateAPIView):
    queryset = SuperUser.objects.all()
    serializer_class = RegisterSuperUserSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data
        serializer = RegisterUserSerializer(data=payload)

        if serializer.is_valid():
            username = payload.get('username')
            email = payload.get('email')
            first_name = payload.get('first_name')
            last_name = payload.get('last_name')
            national_code = payload.get('national_code')
            phone_number = payload.get('phone_number')
            ramz_shakhsi = payload.get('ramz_shakhsi')

            if SuperUser.objects.filter(username=username, email=email).exists():
                return Response({"message": "شما قبلا ثبت نام نموده اید"}, status=status.HTTP_400_BAD_REQUEST)

            if ramz_shakhsi == 'jdxwbapxq62tze8lf544ekawklwn@&&&&&&el4545efeklnlhwwnn#jbsja*2251557822dfgfhjyhrsgrwtgw':
                user = SuperUser.objects.create(
                    first_name=first_name,
                    last_name=last_name,
                    national_code=national_code,
                    phone_number=phone_number,
                    username=username,
                    email=email,
                )
                user.set_password(payload.get('password'))
                user.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "رمزعبور تایید دومرحله ای شما نادرست است.لطفا دوباره تلاش نمایید"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginSuperUser(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSuperUserSerializer
    queryset = SuperUser.objects.all()

    def generate_tokens(self, user):
        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token
        refresh_token['user_id'] = user.id
        refresh_token['user_uid'] = user.uid
        refresh_token['phone_number'] = user.phone_number
        refresh_token['username'] = user.username
        refresh_token['email'] = user.email
        refresh_token['is_staff'] = user.is_staff
        access_token['user_id'] = user.id
        access_token['user_uid'] = user.uid
        access_token['phone_number'] = user.phone_number
        access_token['username'] = user.username
        access_token['email'] = user.email
        access_token['is_staff'] = user.is_staff

        response_data = {
            'refresh': str(refresh_token),
            'access': str(access_token),
            'is_staff': user.is_staff,
            'email': user.email,
            'phone_number': user.phone_number
        }

        return response_data

    def post(self, request):
        payload = request.data
        username = payload['username']
        password = payload['password']
        if SuperUser.objects.filter(username=username).exists():
            superuser = authenticate(request=request, username=username, password=password)
            if superuser is not None:
                login(request, superuser)
                tokens = self.generate_tokens(superuser)
                return Response(tokens, status=status.HTTP_200_OK)
            else:
                return Response({"message": "رمزعبور اشتباه است.دوباره تلاش کنید"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "نام کاربری در گروه ادمین وجود ندارد.لطفا ابتدا ثبت نام نمایید"}, status=status.HTTP_404_NOT_FOUND)



class ResetSuperUserPassword(generics.CreateAPIView):
    queryset = SuperUser.objects.all()
    serializer_class = ResetSuperUserPasswordSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        superuser_uid = self.kwargs.get('uid')
        superuser = SuperUser.objects.get(uid=superuser_uid)
        serializer = self.get_serializer(superuser, data=request.data)

        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            password2 = serializer.validated_data.get('password2')
            password3 = serializer.validated_data.get('password3')

            if not superuser.check_password(password):
                return Response({'error': 'رمزعبور اشتباه است. لطفا دوباره تلاش فرمایید'}, status=status.HTTP_400_BAD_REQUEST)

            if password2 == password3:
                superuser.set_password(password2)
                superuser.save()
                return Response({'message': 'رمزعبور شما با موفقیت تغییر کرد'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'رمزعبور جدید با تایید رمزعبور جدید تظابق ندارد'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotUserPasswordView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ForgotUserPasswordSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        payload = request.data
        username = payload['username']
        email = payload['email']
        national_code = payload['national_code']
        password2 = payload['password2']
        password3 = payload['password3']

        if User.objects.filter(username=username, email=email, national_code=national_code).exists():
            if password2 == password3:
                user = User.objects.get(username=username)
                user.set_password(password2)
                user.save()
                return Response({'message': 'رمزعبور با موفقیت تغییر یافت'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'رمزعبور جدید با تایید رمزعبور جدید تطابق ندارد'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'کاربر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)


class ForgotSuperUserPasswordView(generics.CreateAPIView):
    queryset = SuperUser.objects.all()
    serializer_class = ForgotSuperUserPasswordSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        payload = request.data
        username = payload['username']
        email = payload['email']
        national_code = payload['national_code']
        password2 = payload['password2']
        password3 = payload['password3']

        if SuperUser.objects.filter(username=username, email=email, national_code=national_code).exists():
            if password2 == password3:
                user = SuperUser.objects.get(username=username)
                user.set_password(password2)
                user.save()
                return Response({'message': 'رمزعبور با موفقیت تغییر یافت'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'رمزعبور جدید با تایید رمزعبور جدید تطابق ندارد'},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'کاربر یافت نشد'}, status=status.HTTP_404_NOT_FOUND)







class CompleteUserProfileInformation(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = RegisterProfileUserSerializer
    permission_classes = (AllowAny,)

    def update(self, request, *args, **kwargs):
        payload = request.data
        id = payload['id']
        league_id = payload['league']
        user = User.objects.get(id=id)
        profile, created = Profile.objects.get_or_create(user=user)
        league = League.objects.get(id=league_id)
        serializer = RegisterProfileUserSerializer(profile, data=payload)
        if profile.country and profile.city and profile.birthday and profile.number_of_teams:
            return Response({'message': 'شما قبلا پروفایل خود را تکمیل نمودید لطفا از قسمت بروزرسانی پروفایل خود را تغییر دهید'}, status=status.HTTP_408_REQUEST_TIMEOUT)
        else:
            if serializer.is_valid():
                serializer.save(league=league)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UpdateUserProfileInformation(generics.UpdateAPIView):
    serializer_class = UpdateProfileUserSerializer
    permission_classes = (AllowAny,)


    def update(self, request, *args, **kwargs):
        payload = request.data
        # uid = payload['uid']
        uid = self.kwargs.get('uid')
        league_id = payload['league']
        user = User.objects.get(uid=uid)
        profile, created = Profile.objects.get_or_create(user=user)
        league = League.objects.get(id=league_id)
        serializer = RegisterProfileUserSerializer(profile, data=payload)
        try:
            if Profile.objects.get(user=user, cant_update_after_register='can_update', order_status='pendingـpayment'):
                if serializer.is_valid():
                    serializer.save(league=league, sarparast_confirmed=True, confirmed_rule=True, confirmed_information=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
            elif Profile.objects.get(user=user, order_status='waitingـforـpaymentـconfirmation'):
                return Response(status=status.HTTP_408_REQUEST_TIMEOUT)
            
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
      




# see status of all teams   Superuser
class TeamStatusPreviewBySuperUser(generics.ListAPIView):
    serializer_class = TeamStatusPreviewBySuperUserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        superuser = SuperUser.objects.get(uid=uid)
        try:
            if superuser:
                return Profile.objects.filter(active=True, name_of_team__isnull=False, name_of_team__gt='')
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except superuser.DoesNotExist:
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)    


# see status of one teams by pid  Superuser
class RetrieveNestedProfileTeamStatusPreviewBySuperUserAPIView(generics.RetrieveAPIView):
    serializer_class = TeamStatusPreviewBySuperUserTwoSerializer
    permission_classes = (AllowAny,)
    queryset = Profile.objects.filter(active=True)

    def get_object(self):
        uid = self.kwargs.get('uid')
        pid = self.kwargs.get('pid')
        superuser = SuperUser.objects.get(uid=uid)
        try:
            if superuser:
                profile = self.queryset.get(pid=pid)
                return profile
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        except superuser.DoesNotExist:
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)      



# see status of all teams   in Main page site for all user that unregister
# a table league name    team name    and order status for all is register so i dont need to get in here
class TeamStatusPreviewByMainUser(generics.ListAPIView):
    queryset = Profile.objects.filter(order_status='register', active=True, name_of_team__isnull=False, name_of_team__gt='')
    serializer_class = TeamStatusPreviewByMainUserSerializer
    permission_classes = (AllowAny,)


#user to his payment status   name_of_team    order_status    payment_status    total_price
class PaymentUserStatusListAPIView(generics.ListAPIView):
    serializer_class = PaymentUserStatusSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        user = User.objects.get(uid=uid)
        return Payment.objects.filter(user=user)

class PaymentUserStatustwoListAPIView(generics.ListAPIView):
    serializer_class = PaymentUserStatustwoSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        user = User.objects.get(uid=uid)
        return Profile.objects.filter(user=user)



# Complete information member by User for example 4 member for one user by forign key
class CompleteInformationMemberByUserListCreateAPIView(generics.CreateAPIView):
    serializer_class = CompleteInformationMemberByUserSerializer
    permission_classes = (AllowAny,)

    # create the user by request.user

    def create(self, request, *args, **kwargs):
        payload = request.data
        id = payload['id']
        user = User.objects.get(id=id)
        serializer = CompleteInformationMemberByUserSerializer(data=payload)

        try:
            if user:
                if Team.objects.filter(user=user).exists():
                    if Team.objects.filter(user=user, cant_update_after_register='cant_update').first():
                        return Response({'message': 'شما قادر به تغییر اطلاعات نیستید'}, status=status.HTTP_400_BAD_REQUEST)

                    elif Team.objects.filter(user=user, cant_update_after_register='can_update').first():
                        if serializer.is_valid():
                            first_name = payload.get('first_name')
                            last_name = payload.get('last_name')
                            national_code = payload.get('national_code')
                            phone_number = payload.get('phone_number')
                            birthday = payload.get('birthday')
                            country = payload.get('country')
                            city = payload.get('city')
                            shahrestan = payload.get('shahrestan')
                            email = payload.get('email')
                            address = payload.get('address')

                            team = Team.objects.create(
                                user=user,
                                first_name=first_name,
                                last_name=last_name,
                                national_code=national_code,
                                phone_number=phone_number,
                                birthday=birthday,
                                country=country,
                                city=city,
                                shahrestan=shahrestan,
                                email=email,
                                address=address,
                            )
                            team.save()
                            return Response(serializer.data, status=status.HTTP_201_CREATED)
                        else:
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    if serializer.is_valid():
                        first_name = payload.get('first_name')
                        last_name = payload.get('last_name')
                        national_code = payload.get('national_code')
                        phone_number = payload.get('phone_number')
                        birthday = payload.get('birthday')
                        country = payload.get('country')
                        city = payload.get('city')
                        shahrestan = payload.get('shahrestan')
                        email = payload.get('email')
                        address = payload.get('address')

                        team = Team.objects.create(
                            user=user,
                            first_name=first_name,
                            last_name=last_name,
                            national_code=national_code,
                            phone_number=phone_number,
                            birthday=birthday,
                            country=country,
                            city=city,
                            shahrestan=shahrestan,
                            email=email,
                            address=address,
                        )
                        team.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)    


class GetAllMemberForOneUserListAPIView(generics.ListAPIView):
    serializer_class = CompleteInformationMemberByUserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        user = User.objects.get(uid=uid)
        return Team.objects.filter(user=user)


class MemberTeamItemDeleteAPIView(generics.DestroyAPIView):
    serializer_class = CompleteInformationMemberByUserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        tid = self.kwargs.get('tid')
        user_uid = self.kwargs.get('uid')
        user = User.objects.get(uid=user_uid)
        if Team.objects.filter(user=user, cant_update_after_register='cant_update').first():
            return Response({'message': 'شما قادر به تغییر اطلاعات نیستید'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                if user:
                    return Team.objects.get(tid=tid)
                else:
                    return None
            except user.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)        

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


# update member information by user
class UpdateInformationMemberByUserListUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CompleteInformationMemberByUserSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'tid'

    # get the team member object by user=user
    def get_object(self):
        user = self.request.user
        tid = self.kwargs.get('tid')
        return Team.objects.filter(user=user, tid=tid).first()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if instance is None:
            return Response({'message': 'عضو تیم یافت نشد'}, status=status.HTTP_404_NOT_FOUND)

        payload = request.data.copy()
        payload['user'] = request.user.id

        if instance.cant_update_after_register == 'cant_update':
            return Response({'message': 'شما قادر به تغییر اطلاعات نیستید'}, status=status.HTTP_400_BAD_REQUEST)

        if instance.cant_update_after_register == 'can_update':
            serializer = self.get_serializer(instance, data=payload, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()



# send picture of payment User first get the total_price  sub price of member    and hotel sub price
class SendPictureUserClickByPayIDListApiView(generics.ListAPIView):
    serializer_class = SendPicturePaymentUserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        user = User.objects.get(uid=uid)

        # price_per_member = PricePerMember.objects.all().order_by('-id')[:1]
        # hotel = Hotel.objects.filter().order_by('-id')[:1]
        price_per_member = PricePerMember.objects.last()
        hotel = Hotel.objects.last()
        hotel_price_for_multi_night = hotel.price_multi_nights
        profile = Profile.objects.get(user=user)

        if profile is not None:
            member_sub_price = Decimal(price_per_member.price) * Decimal(profile.number_of_teams) + Decimal(price_per_member.price) * Decimal(1.5)
            if profile.hotel_status:
                hotel_sub_price = Decimal(hotel_price_for_multi_night) * (Decimal(profile.number_of_teams) + 1)
            else:
                hotel_sub_price = 0

            total_price = Decimal(member_sub_price) + Decimal(hotel_sub_price)

            return [
                {'total_price': total_price},
                {'member_sub_price': member_sub_price},
                {'hotel_sub_price': hotel_sub_price}
            ]
        else:
            return [{'error': 'Profile not found'}]




# send picture of payment User end POST the 3 images
class SendPictureUserTotalPriceCreateAPIView(generics.CreateAPIView):
    serializer_class = SendPicturePaymenttwoUserSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        payload = request.data
        uid = self.kwargs.get('uid')
        user = User.objects.get(uid=uid)
        serializer = SendPicturePaymenttwoUserSerializer(data=payload)

        price_per_member = PricePerMember.objects.last()
        hotel = Hotel.objects.last()
        hotel_price_for_multi_night = hotel.price_multi_nights
        profile = Profile.objects.get(user=user)

        if profile.order_status == 'pendingـpayment':

            if Payment.objects.filter(user=user).exists():
                if Payment.objects.filter(user=user, cant_update_after_register='cant_update').exists():
                    return Response({'message': 'شما قادر به ارسال فیش واریز وجه نیستید'}, status=status.HTTP_400_BAD_REQUEST)
                elif Payment.objects.filter(user=user, cant_update_after_register='can_update').exists():
                    if profile is not None:

                        member_sub_price = Decimal(price_per_member.price) * Decimal(profile.number_of_teams) + Decimal(
                            price_per_member.price) * Decimal(1.5)
                        if profile.hotel_status:
                            hotel_sub_price = Decimal(hotel_price_for_multi_night) * (Decimal(profile.number_of_teams) + 1)
                        else:
                            hotel_sub_price = 0

                        total_price = Decimal(member_sub_price) + Decimal(hotel_sub_price)

                        if serializer.is_valid():
                            image = payload.get('image')
                            image2 = payload.get('image2')
                            image3 = payload.get('image3')

                            payment = Payment.objects.create(
                                user=user,
                                image=image,
                                image2=image2,
                                image3=image3,
                                total_price=total_price,
                                member_sub_price=member_sub_price,
                                hotel_sub_price=hotel_sub_price,
                                orders_status='waitingـforـpaymentـconfirmation',
                            )
                            payment.save()
                            profile = Profile.objects.get(user=user)
                            profile.order_status = 'waitingـforـpaymentـconfirmation'
                            profile.save()
                            return Response(serializer.data, status=status.HTTP_201_CREATED)
                        else:
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'message': 'لطفا ابتدا اطلاعات خود را تکمیل کنید'}, status=status.HTTP_404_NOT_FOUND)
            else:
                if profile is not None:
                    member_sub_price = Decimal(price_per_member.price) * Decimal(profile.number_of_teams) + Decimal(
                        price_per_member.price) * Decimal(1.5)
                    if profile.hotel_status:
                        hotel_sub_price = Decimal(hotel_price_for_multi_night) * (Decimal(profile.number_of_teams) + 1)
                    else:
                        hotel_sub_price = 0

                    total_price = Decimal(member_sub_price) + Decimal(hotel_sub_price)

                    if serializer.is_valid():
                        image = payload.get('image')
                        image2 = payload.get('image2')
                        image3 = payload.get('image3')

                        payment = Payment.objects.create(
                            user=user,
                            image=image,
                            image2=image2,
                            image3=image3,
                            total_price=total_price,
                            member_sub_price=member_sub_price,
                            hotel_sub_price=hotel_sub_price,
                            orders_status='waitingـforـpaymentـconfirmation',
                        )
                        payment.save()
                        profile = Profile.objects.get(user=user)
                        profile.order_status = 'waitingـforـpaymentـconfirmation'
                        profile.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'message': 'لطفا ابتدا اطلاعات خود را تکمیل کنید'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'فیش واریزوجه شما منتظر تایید شدن توسط ادمین میباشد شما قادر به ارسال فیش واریز وجه جدید نمی باشید'}, status=status.HTTP_400_BAD_REQUEST)



# super user confirm the payment
class ConfirmPaymentSuperUserListAPIView(generics.ListAPIView):
    serializer_class = ConfirmPaymentSuperUserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self, *args, **kwargs):
        uid = self.kwargs.get('uid')
        superuser = SuperUser.objects.get(uid=uid)
        try:
            if superuser:
                return Payment.objects.filter(orders_status='waitingـforـpaymentـconfirmation')
            else:
                return Response(status=status.HTTP_408_REQUEST_TIMEOUT)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# retrive one payid that admin choose
class RetrieveNestedPaymentAPIView(generics.RetrieveAPIView):
    serializer_class = NestedPaymentSerializer
    permission_classes = (AllowAny,)
    queryset = Payment.objects.filter(orders_status='waitingـforـpaymentـconfirmation')

    def get_object(self):
        uid = self.kwargs.get('uid')
        superuser = SuperUser.objects.get(uid=uid)
        try:
            if superuser:
                payid = self.kwargs.get('payid')
                payment = self.queryset.filter(payid=payid).first()
                return payment
            else:
                return Response(status=status.HTTP_408_REQUEST_TIMEOUT)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# if check in payload was true i have to accept payment and uncheck reject payment
class ConfirmPaymentSuperUserCreateAPIView(generics.CreateAPIView):
    serializer_class = ConfirmPaymentSuperUserAcceptOrRejectSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        payload = request.data
        payid = self.kwargs.get('payid')
        superuser_uid = self.kwargs.get('uid')
        payment_check = payload.get('payment_check')
        payment_uncheck = payload.get('payment_uncheck')

        try:
            if SuperUser.objects.get(uid=superuser_uid):

                try:
                    payment = Payment.objects.get(payid=payid)
                except Payment.DoesNotExist:
                    return Response({'error': 'شناسه پرداخت وجود ندارد'}, status=status.HTTP_404_NOT_FOUND)

                profile = payment.user.profile

                team = payment.user.teamUser.first()

                if payment_uncheck == 'true' and payment_check == 'true':
                    return Response({'message': 'لطفا پرداختی را تایید یا رد تایید کنید به طور همزمان امکان تایید و رد پرداخت وجود ندارد'}, status=status.HTTP_400_BAD_REQUEST)

                if payment_uncheck == 'false' and payment_check == 'false':
                    return Response({'message': 'لطفا پرداختی را تایید یا رد تایید کنید به طور همزمان امکان تایید و رد پرداخت وجود ندارد'}, status=status.HTTP_400_BAD_REQUEST)


                if payment_check == 'true':
                    payment.payment_check_status = 'accept'
                    payment.orders_status = 'register'
                    payment.payment_status = 'paid'
                    payment.cant_update_after_register = 'cant_update'
                    profile.order_status = 'register'
                    profile.cant_update_after_register = 'cant_update'
                    # if Team.objects.filter(user=team).exists():
                    team.cant_update_after_register = 'cant_update'
                    team.save()
                    payment.save()
                    profile.save()
                    
                    return Response({'message': 'پرداختی تیم موردنظر با موفقیت تایید شد'}, status=status.HTTP_200_OK)
                    

                if payment_uncheck == 'true':
                    payment.payment_check_status = 'reject'
                    payment.orders_status = 'pendingـpayment'
                    payment.payment_status = 'unPaid'
                    profile.order_status = 'pendingـpayment'
                    payment.save()
                    profile.save()
                    return Response({'message': 'پرداختی تیم موردنظر با موفقیت رد تایید شد'}, status=status.HTTP_200_OK)


                return Response({'message': 'درخواست نامعتبر،لطفا پرداختی را تایید یا رد تایید کنید'}, status=status.HTTP_400_BAD_REQUEST)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)
            


# Search method for main page of site search by name of team
class SearchTeamforHomePageAPIView(generics.ListAPIView):
    serializer_class = SearchTeamforHomePageSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name_of_team']

    def get_queryset(self):
        queryset = Profile.objects.filter(active=True, order_status='register')
        search_query = self.request.query_params.get('search', None)

        if search_query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('name_of_team', search_query)
            ).filter(similarity__gt=0.01).order_by('-similarity')

        return queryset


# Search for superuser  to name of team
class SearchSuperUserTeamforHomePageAPIView(generics.ListAPIView):
    serializer_class = SearchTeamforHomePageSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ['name_of_team']

    def get_queryset(self):
        queryset = Profile.objects.all()
        search_query = self.request.query_params.get('search', None)

        if search_query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('name_of_team', search_query)
            ).filter(similarity__gt=0.01).order_by('-similarity')

        return queryset
