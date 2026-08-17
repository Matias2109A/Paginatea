# Traduce python y JSON
from rest_framework import serializers
from .models import Pregunta
from .moderacion import validar_texto

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'autor_nombre', 'contenido', 'fecha_creacion', 'respuesta', 'fecha_respuesta']
        read_only_fields = ['respuesta', 'fecha_respuesta']

    def validate_autor_nombre(self, value):
        error = validar_texto(value)
        if error:
            raise serializers.ValidationError(error)
        return value

    def validate_contenido(self, value):
        error = validar_texto(value)
        if error:
            raise serializers.ValidationError(error)
        return value