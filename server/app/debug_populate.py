from app.models import *

def populate():
    u = User()
    u.username="omerhorev"
    u.password="Aa123456"
    u.first_name="Omer"
    u.last_name="Horev"
    u.save()

    su = SoldierUser()
    su.user = u
    su.armyID = "8087677"
    su.save()