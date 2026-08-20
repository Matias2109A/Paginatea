import logging
from django.contrib import admin
from django.contrib.auth.models import Group, User
from django.utils import timezone
from django.core.mail import EmailMessage
from django.conf import settings
from .models import Evento, SuscriptorEventos

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
    list_display = ('titulo', 'fecha', 'hora', 'ubicacion', 'creado_por')
    list_filter = (ProximidadFilter,)
    search_fields = ('titulo', 'ubicacion')
    ordering = ('fecha', 'hora')

    fieldsets = (
        ("Datos del evento", {
            'fields': ('titulo', 'descripcion', 'fecha', 'hora', 'ubicacion'),
            'description': "Completá los datos y guardá. El evento aparece automáticamente en la web mientras la fecha no haya pasado.",
        }),
    )

    def save_model(self, request, obj, form, change):
        es_nuevo = not obj.pk
        if es_nuevo:
            obj.creado_por = request.user
        super().save_model(request, obj, form, change)

        if es_nuevo:
            logger.info(f"Nuevo evento cargado: '{obj.titulo}' ({obj.fecha}) por {request.user.username}")
            self._avisar_suscriptores(obj)

    def _avisar_suscriptores(self, evento):
        emails = list(
            SuscriptorEventos.objects.filter(activo=True).values_list('email', flat=True)
        )
        if not emails:
            return

        asunto = f"Nuevo evento en TEA-MO: {evento.titulo}"
        cuerpo = (
            f"Hola,\n\n"
            f"Se publicó un nuevo evento en TEA-MO:\n\n"
            f"{evento.titulo}\n"
            f"Fecha: {evento.fecha.strftime('%d/%m/%Y')}\n"
            f"Hora: {evento.hora.strftime('%H:%M')} hs\n"
            f"Lugar: {evento.ubicacion}\n\n"
            f"{evento.descripcion or ''}\n\n"
            "Te llega este mensaje porque te suscribiste a las notificaciones de eventos "
            "en nuestra web.\n\n"
            "— Equipo TEA-MO"
        )
        try:
            mensaje = EmailMessage(
                asunto, cuerpo, settings.DEFAULT_FROM_EMAIL,
                to=[settings.DEFAULT_FROM_EMAIL], bcc=emails,
            )
            mensaje.send(fail_silently=False)
            logger.info(f"Notificación de evento '{evento.titulo}' enviada a {len(emails)} suscriptor(es)")
        except Exception as e:
            logger.error(f"No se pudo enviar la notificación del evento '{evento.titulo}': {e}")


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
