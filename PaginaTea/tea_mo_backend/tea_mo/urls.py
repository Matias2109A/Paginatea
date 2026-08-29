from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from decouple import config
import types

admin.site.site_header = "TEA-MO — Panel de administración"
admin.site.site_title = "TEA-MO"
admin.site.index_title = "Panel de control"
# El botón "Ver sitio" del panel te manda a la la pagina principal.
# En desarrollo es localhost:5173; cuando ganemos cambiar el FRONTEND_URL en el .env.
admin.site.site_url = config('FRONTEND_URL', default='http://localhost:5173/')


def index_con_resumen(self, request, extra_context=None):
    from django.utils import timezone
    from preguntas.models import Pregunta
    from eventos.models import Evento

    extra_context = extra_context or {}
    extra_context['preguntas_pendientes'] = Pregunta.objects.filter(
        respuesta__isnull=True
    ).count() + Pregunta.objects.filter(respuesta='').count()
    extra_context['preguntas_respondidas'] = Pregunta.objects.exclude(
        respuesta__isnull=True
    ).exclude(respuesta='').count()
    extra_context['proximo_evento'] = Evento.objects.filter(
        fecha__gte=timezone.localdate()
    ).order_by('fecha', 'hora').first()
    extra_context['eventos_proximos_total'] = Evento.objects.filter(
        fecha__gte=timezone.localdate()
    ).count()

    return admin.AdminSite.index(self, request, extra_context)


admin.site.index = types.MethodType(index_con_resumen, admin.site)


def get_app_list_ordenada(self, request, app_label=None):
    app_list = admin.AdminSite.get_app_list(self, request, app_label)
    orden = ['eventos', 'preguntas', 'auth', 'admin_interface', 'admin']
    app_list.sort(key=lambda app: orden.index(app['app_label']) if app['app_label'] in orden else len(orden))
    return app_list


admin.site.get_app_list = types.MethodType(get_app_list_ordenada, admin.site)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('preguntas.urls')),
    path('api/', include('eventos.urls')),
]

if settings.DEBUG:
    # Solo en desarrollo: Django sirve los archivos subidos (como el logo)
    # él mismo. En producción, eso lo hace el servidor web (Nginx, etc.).
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Mapa de rutas raiz