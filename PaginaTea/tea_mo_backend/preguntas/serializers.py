import logging
from rest_framework import serializers
from .models import Pregunta
from .moderacion import validar_texto
from .utils import obtener_ip, obtener_user_agent

logger = logging.getLogger('tea_mo')

class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'autor_nombre', 'autor_email', 'contenido', 'fecha_creacion', 'respuesta', 'fecha_respuesta']
        read_only_fields = ['respuesta', 'fecha_respuesta']
        extra_kwargs = {
            'autor_email': {'write_only': True, 'required': False, 'allow_blank': True},
        }

    def _datos_peticion(self):
        request = self.context.get('request')
        if not request:
            return 'desconocida', 'desconocido'
        return obtener_ip(request), obtener_user_agent(request)

    def validate_autor_nombre(self, value):
        resultado = validar_texto(value)
        if resultado:
            motivo, mensaje = resultado
            ip, user_agent = self._datos_peticion()
            logger.warning(
                f"Nombre rechazado — motivo: {motivo} — IP: {ip} — User-Agent: {user_agent} — mensaje enviado: '{value[:300]}'"
            )
            raise serializers.ValidationError(mensaje)
        return value

    def validate_contenido(self, value):
        resultado = validar_texto(value)
        if resultado:
            motivo, mensaje = resultado
            ip, user_agent = self._datos_peticion()
            logger.warning(
                f"Pregunta rechazada — motivo: {motivo} — IP: {ip} — User-Agent: {user_agent} — mensaje enviado: '{value[:300]}'"
            )
            raise serializers.ValidationError(mensaje)
        return value