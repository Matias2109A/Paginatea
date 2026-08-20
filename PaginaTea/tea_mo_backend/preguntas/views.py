import logging
from rest_framework import generics, throttling
from rest_framework.pagination import PageNumberPagination
from .models import Pregunta
from .serializers import PreguntaSerializer
from .utils import obtener_ip, obtener_user_agent

logger = logging.getLogger('tea_mo')

class PreguntaPostThrottle(throttling.AnonRateThrottle):
    # El rate se define en settings.py, en DEFAULT_THROTTLE_RATES['preguntas_post']
    scope = 'preguntas_post'

    def allow_request(self, request, view):
        permitido = super().allow_request(request, view)
        if not permitido:
            ip = obtener_ip(request)
            user_agent = obtener_user_agent(request)
            logger.warning(
                f"Envío de pregunta bloqueado por límite de frecuencia — IP: {ip} — User-Agent: {user_agent}"
            )
        return permitido

class PreguntasPagination(PageNumberPagination):
    page_size = 10  

class PreguntaListCreate(generics.ListCreateAPIView):
    queryset = Pregunta.objects.all().order_by('-fecha_creacion')
    serializer_class = PreguntaSerializer
    pagination_class = PreguntasPagination

    def get_throttles(self):
        if self.request.method == 'POST':
            return [PreguntaPostThrottle()]
        return []

    def perform_create(self, serializer):
        pregunta = serializer.save()
        ip = obtener_ip(self.request)
        user_agent = obtener_user_agent(self.request)
        logger.info(
            f"Nueva pregunta (id={pregunta.id}) de '{pregunta.autor_nombre}' — IP: {ip} — User-Agent: {user_agent}"
        )

