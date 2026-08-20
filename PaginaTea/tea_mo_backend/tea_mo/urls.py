from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "TEA-MO — Panel de administración"
admin.site.site_title = "TEA-MO"
admin.site.index_title = "Preguntas de la comunidad"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('preguntas.urls')),
    path('api/', include('eventos.urls')),
]

# Mapa de rutas raiz