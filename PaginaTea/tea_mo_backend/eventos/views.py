import logging
from rest_framework import generics, permissions, throttling, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.utils import timezone
from .models import Evento, SuscriptorEventos
from .serializers import EventoSerializer, SuscriptorSerializer

logger = logging.getLogger('tea_mo')


class EventosPagination(PageNumberPagination):
    page_size = 6  


class EventoListPublic(generics.ListAPIView):

    serializer_class = EventoSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = EventosPagination

    def get_queryset(self):
        hoy = timezone.localdate()
        return Evento.objects.filter(fecha__gte=hoy).order_by('fecha', 'hora')


class SuscripcionThrottle(throttling.AnonRateThrottle):
    scope = 'suscripcion_eventos'


class SuscribirseEventos(generics.CreateAPIView):
    serializer_class = SuscriptorSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [SuscripcionThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email'].strip().lower()

        suscriptor, creado = SuscriptorEventos.objects.get_or_create(
            email=email, defaults={'activo': True},
        )
        if not creado and not suscriptor.activo:
            suscriptor.activo = True
            suscriptor.save()

        logger.info(f"Suscripción a eventos: {email} ({'nueva' if creado else 'reactivada'})")
        return Response({'email': suscriptor.email}, status=status.HTTP_201_CREATED)
