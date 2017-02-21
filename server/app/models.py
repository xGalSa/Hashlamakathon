from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # A field from the user's profile:
    #armyID = serializers.CharField(max_length=8)

    class Meta:
        model = User
        fields = ('first_name', 'last_name')

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
    # TODO: Add owners and privileges

class Drive(models.Model):
    driverID = models.ForeignKey(SoldierUser)
    vehicle_number = models.ForeignKey(Vehicle)
    source = models.CharField(max_length=256)
    destination = models.CharField(max_length=256)
    start_mileage = models.CharField(max_length=50)
    end_mileage = models.CharField(max_length=50)
    approx_mileage = models.CharField(max_length=50)
    start_time = models.CharField(max_length=100)
    end_time = models.CharField(max_length=100)
    approx_time = models.CharField(max_length=100)
    # add officer approval

