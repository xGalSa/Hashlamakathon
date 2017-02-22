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
from django.utils.decorators import method_decorator
from app.models import *
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from datetime import datetime

@csrf_exempt
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def new_drive_view(request):
    user = request.user

    if user.is_anonymous:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

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
    drive.driverID.current_drive = drive
    drive.driverID.current_drive.save()

    return Response(drive.drive_id, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def drive_info_view(request, id):
    try:
        d = Drive.objects.get(pk=id)
    except Drive.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if d is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    s = DriveDetailsSerializer(d)
    json = JSONRenderer().render(s.data)

    return Response(json, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def drive_finish_view(request, id):
    try:
        d = Drive.objects.get(pk=id)
    except Drive.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if d is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if d.is_active == False:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    d.vehicle_number.current_drive = None
    d.vehicle_number.save()
    d.driverID.current_drive = None
    d.driverID.save()
    d.end_time = datetime.now()
    d.is_active = False
    d.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def all_drives_view(request):
    drives = Drive.objects.all()

    serializer = DriveDetailsSerializer(drives, many=True)
    json = JSONRenderer().render(serializer.data)
    return Response(json, status=status.HTTP_200_OK)