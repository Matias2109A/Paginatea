from django.contrib import admin
from django.utils.html import format_html

from .models import RegistroLog


@admin.register(RegistroLog)
class RegistroLogAdmin(admin.ModelAdmin):

    list_display = ('fecha', 'etiqueta_nivel', 'categoria', 'mensaje_corto', 'ip', 'usuario')
    list_filter = ('nivel', 'categoria', 'fecha')
    search_fields = ('mensaje', 'ip', 'usuario')
    date_hierarchy = 'fecha'
    ordering = ('-fecha',)
    list_per_page = 50

    readonly_fields = ('fecha', 'nivel', 'categoria', 'mensaje', 'ip', 'user_agent', 'usuario')

    fieldsets = (
        ("Qué pasó", {
            'fields': ('fecha', 'nivel', 'categoria', 'mensaje'),
        }),
        ("Desde dónde", {
            'fields': ('ip', 'user_agent', 'usuario'),
        }),
    )

    @admin.display(description="Nivel", ordering='nivel')
    def etiqueta_nivel(self, obj):
        colores = {
            'INFO': ('#E8F3E9', '#2E7D32'),
            'WARNING': ('#FFF6E5', '#8A6100'),
            'ERROR': ('#FDF1F1', '#A33A3A'),
        }
        fondo, texto = colores.get(obj.nivel, ('#EFE9DF', '#4A433A'))
        return format_html(
            '<span style="background:{};color:{};padding:0.2rem 0.6rem;'
            'border-radius:20px;font-size:11px;font-weight:700;">{}</span>',
            fondo, texto, obj.get_nivel_display(),
        )

    @admin.display(description="Detalle")
    def mensaje_corto(self, obj):
        return obj.mensaje if len(obj.mensaje) <= 80 else obj.mensaje[:80] + "…"

    def has_module_permission(self, request):
        return request.user.is_superuser

    def has_view_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False