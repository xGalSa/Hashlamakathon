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
    user = models.OneToOneField(User)

    def __str__(self):
        return "%s's soldier profile" % self.user