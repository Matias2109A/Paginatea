import logging
from django.contrib import admin
from django.contrib.auth.models import Group, User
from django.utils import timezone
from django.core.mail import EmailMessage
from django.conf import settings
from .models import Evento, SuscriptorEventos

from django.utils.html import format_html
from django.urls import reverse

logger = logging.getLogger('tea_mo')


class ProximidadFilter(admin.SimpleListFilter):
    title = "Cuándo"
    parameter_name = "cuando"

    def lookups(self, request, model_admin):
        return [
            ("proximos", "Próximos"),
            ("pasados", "Ya pasaron"),
        ]

    def queryset(self, request, queryset):
        hoy = timezone.localdate()
        if self.value() == "proximos":
            return queryset.filter(fecha__gte=hoy)
        if self.value() == "pasados":
            return queryset.filter(fecha__lt=hoy)
        return queryset


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'fecha', 'hora', 'ubicacion', 'creado_por', 'accion_boton')
    list_filter = (ProximidadFilter,)
    search_fields = ('titulo', 'ubicacion')
    ordering = ('fecha', 'hora')

    fieldsets = (
        ("Datos del evento", {
            'fields': ('titulo', 'descripcion', 'fecha', 'hora', 'ubicacion'),
            'description': "Completá los datos y guardá. El evento aparece automáticamente en la web mientras la fecha no haya pasado.",
        }),
    )

    @admin.display(description="Acción")
    def accion_boton(self, obj):
        url = reverse('admin:eventos_evento_change', args=[obj.pk])
        return format_html('<a class="tea-mo-btn-accion tea-mo-btn-ver" href="{}">Editar</a>', url)

    def save_model(self, request, obj, form, change):
        es_nuevo = not obj.pk
        if es_nuevo:
            obj.creado_por = request.user
        super().save_model(request, obj, form, change)

        if es_nuevo:
            logger.info(f"Nuevo evento cargado: '{obj.titulo}' ({obj.fecha}) por {request.user.username}")
            self._avisar_suscriptores(obj)

    def _avisar_suscriptores(self, evento):
        from django.core import signing
        from django.template.loader import render_to_string
        from django.utils.html import strip_tags
        from django.core.mail import EmailMultiAlternatives
        from decouple import config

        suscriptores = SuscriptorEventos.objects.filter(activo=True)
        if not suscriptores.exists():
            return

        backend_url = config('BACKEND_URL', default='http://127.0.0.1:8000')
        asunto = f"Nuevo evento en TEA-MO: {evento.titulo}"
        enviados = 0

        for suscriptor in suscriptores:
            token = signing.dumps(suscriptor.email)
            contexto = {
                'titulo': evento.titulo,
                'fecha': evento.fecha.strftime('%d/%m/%Y'),
                'hora': evento.hora.strftime('%H:%M'),
                'ubicacion': evento.ubicacion,
                'descripcion': evento.descripcion,
                'unsubscribe_url': f"{backend_url}/api/eventos/desuscribirse/{token}/",
            }
            html_contenido = render_to_string('emails/evento_nuevo.html', contexto)
            texto_plano = strip_tags(html_contenido)
            try:
                email = EmailMultiAlternatives(asunto, texto_plano, settings.DEFAULT_FROM_EMAIL, [suscriptor.email])
                email.attach_alternative(html_contenido, "text/html")
                email.send(fail_silently=False)
                enviados += 1
            except Exception as e:
                logger.error(f"No se pudo enviar la notificación del evento a {suscriptor.email}: {e}")

        logger.info(f"Notificación de evento '{evento.titulo}' enviada a {enviados} suscriptor(es)")


class SoloAccesoTotalMixin:
    def has_module_permission(self, request):
        return request.user.is_superuser


@admin.register(SuscriptorEventos)
class SuscriptorEventosAdmin(SoloAccesoTotalMixin, admin.ModelAdmin):
    list_display = ('email', 'activo', 'fecha_alta')
    list_filter = ('activo',)
    search_fields = ('email',)
    ordering = ('-fecha_alta',)

    def has_add_permission(self, request):
        return False
