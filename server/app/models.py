from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers


class SoldierUser(models.Model):
    armyID = models.CharField(max_length=8, primary_key=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self):
        return "%s's soldier profile" % self.user

class Driver(models.Model):
    soldier = models.OneToOneField(SoldierUser, on_delete=models.CASCADE)
    license_number = models.CharField(max_length=9)
    expiration = models.DateField()
    current_drive = models.OneToOneField('Drive', blank=True, null=True)

class Vehicle(models.Model):
    vehicle_number = models.CharField(max_length=10, primary_key=True)
    vehicle_type = models.CharField(max_length=256)
    current_drive = models.OneToOneField('Drive', blank=True, null=True )

    def __str__(self):
        return "v-%s" % self.vehicle_number
    # TODO: Add owners and privileges

class Drive(models.Model):
    driverID = models.ForeignKey(SoldierUser)
    vehicle_number = models.ForeignKey(Vehicle)
    source = models.CharField(max_length=256)
    destination = models.CharField(max_length=256)
    start_mileage = models.IntegerField()
    end_mileage = models.IntegerField(blank=True,null=True)
    approx_mileage = models.IntegerField()
    start_time = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    end_time = models.DateTimeField(blank=True,null=True)
    approx_time = models.DateTimeField()

    def __str__(self):
        return "%s %s" % (self.vehicle_number, self.start_time)
    # add officer approval

class NewDriveDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drive
        fields = ('vehicle_number', 'driverID', 'source', 'destination', 'start_mileage', 'approx_mileage', 'approx_time')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')