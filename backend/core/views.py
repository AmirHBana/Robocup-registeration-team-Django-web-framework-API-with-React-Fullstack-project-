from django.shortcuts import render

from rest_framework import generics, status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.models import League, Hotel, News, PricePerMember
from core.serializers import LeagueSerializer, HotelSerializer, NewsSerializer, PricePerMemberSerializer
from rest_framework.response import Response

from userauths.models import SuperUser


# 7 taqir IsAuthenticated shod AllowAny
# League components
class LeagueListAPIView(generics.ListAPIView):
    queryset = League.objects.all().order_by('-id')
    serializer_class = LeagueSerializer
    permission_classes = [AllowAny]


class LeagueAPIView(generics.CreateAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data
        superuser_uid = payload.get('uid')
        title = payload.get('title')

        try:
            if SuperUser.objects.get(uid=superuser_uid):
                # Create the price for member object
                new_league = League(title=title)
                new_league.save()

                serializer = LeagueSerializer(new_league)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)    

class LeagueItemDeleteAPIView(generics.DestroyAPIView):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        lid = self.kwargs.get('lid')
        superuser_uid = self.kwargs.get('uid')
        if SuperUser.objects.get(uid=superuser_uid):
            return League.objects.get(lid=lid)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)






# certain price for member
class PricePerMemberAPIView(generics.CreateAPIView):
    queryset = PricePerMember.objects.all().order_by('-id')[:1]
    serializer_class = PricePerMemberSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data
        superuser_uid = payload.get('uid')
        price = payload.get('price')

        try:
            if SuperUser.objects.get(uid=superuser_uid):
            
                # Create the price for member object
                new_price = PricePerMember(price=price)
                new_price.save()

                serializer = PricePerMemberSerializer(new_price)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PricePerMemberListAPIView(generics.ListAPIView):
    queryset = PricePerMember.objects.all().order_by('-id')[:1]
    serializer_class = PricePerMemberSerializer
    permission_classes = [AllowAny]





# Hotel components
class HotelListAPIView(generics.ListAPIView):
    queryset = Hotel.objects.all().order_by('-id')[:1]
    serializer_class = HotelSerializer
    permission_classes = [AllowAny]

class HotelAPIView(generics.CreateAPIView):
    serializer_class = HotelSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data
        title = payload.get('title')
        image = payload.get('image')
        superuser_uid = payload.get('uid')
        description = payload.get('description')
        price_per_night = payload.get('price_per_night')
        price_multi_nights = payload.get('price_multi_nights')
        datestart = payload.get('datestart')
        dateend = payload.get('dateend')
        try:
            if SuperUser.objects.get(uid=superuser_uid):
                # Create the News object
                new_hotel = Hotel(title=title, image=image, description=description, price_per_night=price_per_night, price_multi_nights=price_multi_nights, datestart=datestart, dateend=dateend)
                new_hotel.save()

                serializer = HotelSerializer(new_hotel)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    




# News Components
class NewsAPIView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data
        title = payload.get('title')
        image = payload.get('image')
        superuser_uid = payload.get('uid')
        content = payload.get('content')
        active = payload.get('active', True) # default value if not provided in payload
        try:
            if SuperUser.objects.get(uid=superuser_uid):
                # Create the News object
                new_news = News(title=title, image=image, content=content, active=active)
                new_news.save()

                serializer = NewsSerializer(new_news)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except SuperUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


class NewsListAPIView(generics.ListAPIView):
    queryset = News.objects.filter(active=True).order_by('-id')
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]


class NewsItemDeleteAPIView(generics.DestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        nid = self.kwargs.get('nid')
        superuser_uid = self.kwargs.get('uid')
        if SuperUser.objects.get(uid=superuser_uid):
            return News.objects.get(nid=nid)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)



class NewsDetailAPIView(generics.RetrieveAPIView):
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        nid = self.kwargs.get('nid')
        return News.objects.get(nid=nid, active=True)
