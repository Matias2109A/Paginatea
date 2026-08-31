from django.urls import path
from .views import EventoListPublic, SuscribirseEventos, DesuscribirseEventos

urlpatterns = [
    path('eventos/', EventoListPublic.as_view(), name='eventos'),
    path('eventos/suscribirse/', SuscribirseEventos.as_view(), name='suscribirse_eventos'),
    path('eventos/desuscribirse/<str:token>/', DesuscribirseEventos.as_view(), name='desuscribirse_eventos'),
]