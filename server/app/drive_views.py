from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response


@api_view(['PUT'])
@permission_classes((permissions.AllowAny,))
def new_drive_view(request):
    user = request.user

    if user.is_anonymous:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    if request.method == 'PUT':
        print(request.data)
        return Response(status=status.HTTP_404_NOT_FOUND)
