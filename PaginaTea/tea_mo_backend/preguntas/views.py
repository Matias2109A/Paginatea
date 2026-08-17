from rest_framework import generics, throttling
from rest_framework.pagination import PageNumberPagination
from .models import Pregunta
from .serializers import PreguntaSerializer

class PreguntaPostThrottle(throttling.AnonRateThrottle):
    # El rate se define en settings.py, en DEFAULT_THROTTLE_RATES['preguntas_post']
    scope = 'preguntas_post'

class PreguntasPagination(PageNumberPagination):
    page_size = 10  

class PreguntaListCreate(generics.ListCreateAPIView):
    queryset = Pregunta.objects.all().order_by('-fecha_creacion')
    serializer_class = PreguntaSerializer
    pagination_class = PreguntasPagination

    def get_throttles(self):
        # Limita el envío de preguntas (POST).
        if self.request.method == 'POST':
            return [PreguntaPostThrottle()]
        return []