from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from app.models import *


@api_view(['PUT', 'GET'])
@permission_classes((permissions.AllowAny,))
def new_drive_view(request):
    user = request.user

    if user.is_anonymous:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        try:
            s = NewDriveDetailsSerializer(data=request.data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if s.is_valid() == False:
            return Response(status=status.HTTP_404_NOT_FOUND)

        vehicle = Vehicle.objects.get(pk=request.data["vehicle_number"])

        if vehicle.current_drive is not None:
            return Response("exists", status=status.HTTP_404_NOT_FOUND)

        drive = s.save()
        drive.vehicle_number.current_drive = drive
        drive.vehicle_number.save()

        return Response(status=status.HTTP_200_OK)
