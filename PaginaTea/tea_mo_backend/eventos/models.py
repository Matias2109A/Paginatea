from django.db import models
from django.contrib.auth.models import User


class Evento(models.Model):
    titulo = models.CharField(max_length=150, verbose_name="Título del evento")
    descripcion = models.TextField(blank=True, verbose_name="Descripción (opcional)")
    fecha = models.DateField(verbose_name="Fecha")
    hora = models.TimeField(verbose_name="Hora")
    ubicacion = models.CharField(max_length=200, verbose_name="Ubicación")

    creado_por = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Publicado por",
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de carga")

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ['fecha', 'hora']

    def __str__(self):
        return f"{self.titulo} — {self.fecha}"


class SuscriptorEventos(models.Model):
    email = models.EmailField(unique=True, verbose_name="Email")
    activo = models.BooleanField(default=True, verbose_name="Activo")
    fecha_alta = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de alta")

    class Meta:
        verbose_name = "Suscriptor a eventos"
        verbose_name_plural = "Suscriptores a eventos"
        ordering = ['-fecha_alta']

    def __str__(self):
        return self.email
