from django.contrib import admin
from django.utils import timezone
from .models import Evento


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
        if not obj.pk:
            obj.creado_por = request.user
        super().save_model(request, obj, form, change)
