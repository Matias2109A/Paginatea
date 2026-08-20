from rest_framework import generics, permissions
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from .models import Evento
from .serializers import EventoSerializer


class EventosPagination(PageNumberPagination):
    page_size = 6  


class EventoListPublic(generics.ListAPIView):

    serializer_class = EventoSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = EventosPagination

    def get_queryset(self):
        hoy = timezone.localdate()
        return Evento.objects.filter(fecha__gte=hoy).order_by('fecha', 'hora')
