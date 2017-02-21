from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from app.models import *

def get_user_by_soldierID(solderID):
    try:
        return SoldierUser.objects.get(pk=solderID).user
    except SoldierUser.DoesNotExist:
        return None

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def login_view(request, id):
    user = get_user_by_soldierID(id)

    if user == None:
        return Response(JSONRenderer().render({"ok":False}));

    login(request, user)

    return Response(JSONRenderer().render({"ok": True}));

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def logout_view(request):
    user = request.user

    if user.is_anonymous:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    logout(request)

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def current_user_view(request):
    if request.method == 'GET':
        user = request.user

        if user.is_anonymous:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = UserSerializer(user)
        json = JSONRenderer().render(serializer.data)

        return Response(json)


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def user_view(request, id):
    if request.method == 'GET':
        s_user = None
        user = get_user_by_soldierID(id)

        if user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        json = JSONRenderer().render(serializer.data)

        return Response(json)



