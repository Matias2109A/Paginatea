from rest_framework import serializers
from .models import Evento, SuscriptorEventos


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['id', 'titulo', 'descripcion', 'fecha', 'hora', 'ubicacion']


class SuscriptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuscriptorEventos
        fields = ['email']
