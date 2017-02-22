"""untitled URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from django.conf.urls import include
from app.views import *
from app.drive_views import *
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^user/(?P<id>[0-9]{7})$', user_view),
    url(r'^user/$', current_user_view),
    url(r'^user/login/(?P<id>[0-9]{7})$', login_view),
    url(r'^user/logout$', logout_view),

    url(r'^drive/$', new_drive_view),
    url(r'^drive/(?P<id>[0-9]{1,9})/info$', drive_info_view),
    url(r'^drive/(?P<id>[0-9]{1,9})/finish', drive_finish_view),
    url(r'^drive/all', all_drives_view),
]
