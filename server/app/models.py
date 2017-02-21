from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SoldierUser(models.Model):
    armyID = models.CharField(max_length=8, primary_key=True)
    user = models.OneToOneField(User)

    def __str__(self):
        return "%s's soldier profile" % self.user