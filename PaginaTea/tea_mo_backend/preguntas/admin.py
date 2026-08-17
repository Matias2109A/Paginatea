# Panel /admin/ para /preguntas
from django.contrib import admin
from django.contrib.auth.models import Group, User
from django.contrib.auth.admin import UserAdmin
from django.utils import timezone
from .models import Pregunta

class SoloAccesoTotalMixin:
    """Oculta esta sección del menú a menos que la cuenta sea de acceso total (superusuario)."""
    def has_module_permission(self, request):
        return request.user.is_superuser

class GroupAdminRestringido(SoloAccesoTotalMixin, admin.ModelAdmin):
    pass

class UserAdminRestringido(SoloAccesoTotalMixin, UserAdmin):
    pass


admin.site.unregister(Group)
admin.site.register(Group, GroupAdminRestringido)
admin.site.unregister(User)
admin.site.register(User, UserAdminRestringido)

class EstadoRespuestaFilter(admin.SimpleListFilter):
    """Filtro simple para ver de un vistazo solo lo pendiente o lo ya respondido."""
    title = "Estado"
    parameter_name = "estado"

    def lookups(self, request, model_admin):
        return [
            ("pendientes", "Pendientes de responder"),
            ("respondidas", "Ya respondidas"),
        ]

    def queryset(self, request, queryset):
        if self.value() == "pendientes":
            return queryset.filter(respuesta__isnull=True) | queryset.filter(respuesta="")
        if self.value() == "respondidas":
            return queryset.exclude(respuesta__isnull=True).exclude(respuesta="")
        return queryset

@admin.register(Pregunta)
class PreguntaAdmin(admin.ModelAdmin):
    list_display = ('autor_nombre', 'contenido_resumido', 'fecha_creacion', 'estado')
    list_filter = (EstadoRespuestaFilter,)
    search_fields = ('autor_nombre', 'contenido')
    ordering = ('-fecha_creacion',)

    readonly_fields = ('autor_nombre', 'autor_email', 'contenido', 'fecha_creacion', 'respondido_por', 'fecha_respuesta')

    fieldsets = (
        ("Pregunta recibida", {
            'fields': ('autor_nombre', 'autor_email', 'contenido', 'fecha_creacion'),
        }),
        ("Tu respuesta", {
            'fields': ('respuesta',),
            'description': "Escribí la respuesta acá abajo y hacé clic en 'Guardar'. Se publica sola en la web.",
        }),
        ("Datos de la respuesta (se completan solos)", {
            'fields': ('respondido_por', 'fecha_respuesta'),
            'classes': ('collapse',),  
        }),
    )

    @admin.display(description="Pregunta")
    def contenido_resumido(self, obj):
        return obj.contenido if len(obj.contenido) <= 60 else obj.contenido[:60] + "…"

    @admin.display(description="Estado", boolean=True)
    def estado(self, obj):
        return bool(obj.respuesta)

    def save_model(self, request, obj, form, change):
        if obj.respuesta and not obj.respondido_por:
            obj.respondido_por = request.user
            obj.fecha_respuesta = timezone.now()
        super().save_model(request, obj, form, change)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser