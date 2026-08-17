from django.urls import path
from .views import EventoListPublic

urlpatterns = [
    path('eventos/', EventoListPublic.as_view(), name='eventos'),
]
