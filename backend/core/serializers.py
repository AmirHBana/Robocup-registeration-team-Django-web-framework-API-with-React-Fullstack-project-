from rest_framework import serializers
from core.models import League, Hotel, News, PricePerMember


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = (
            'title',
            'lid',
            'id',
        )


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields =(
            'title',
            'image',
            'description',
            'price_per_night',
            'price_multi_nights',
            'datestart',
            'dateend',
            'id',

        )

    def __init__(self, *args, **kwargs):
        super(HotelSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = (
            'title',
            'image',
            'content',
            'active',
            'nid',
            'date',
            'id',
        )

    def __init__(self, *args, **kwargs):
        super(NewsSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


class PricePerMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricePerMember
        fields = ('price', 'id')

    def __init__(self, *args, **kwargs):
        super(PricePerMemberSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3