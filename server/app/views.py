from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from app.models import *

class UserSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    #armyID = serializers.CharField(max_length=8)

    class Meta:
        model = User
        fields = ('first_name', 'last_name')


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def user_view(request, id):
    if request.method == 'GET':

        s_user = None

        try:
            s_user = SoldierUser.objects.get(pk=id)
        except SoldierUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        s_user = SoldierUser.objects.get(pk=id)
        user = s_user.user
        serializer = UserSerializer(user)
        json = JSONRenderer().render(serializer.data)

        return Response(json)



