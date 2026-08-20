from django.urls import path
from .views import EventoListPublic, SuscribirseEventos

urlpatterns = [
    path('eventos/', EventoListPublic.as_view(), name='eventos'),
    path('eventos/suscribirse/', SuscribirseEventos.as_view(), name='suscribirse_eventos'),
]
