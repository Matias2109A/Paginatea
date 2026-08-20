# Define la tabla de /preguntas/
from django.db import models
from django.contrib.auth.models import User

class Pregunta(models.Model):
    autor_nombre = models.CharField(max_length=100, verbose_name="Nombre de quien pregunta")
    autor_email = models.EmailField(blank=True, verbose_name="Email (opcional)")
    contenido = models.TextField(verbose_name="Pregunta")
    fecha_creacion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de la pregunta")

    respuesta = models.TextField(
        blank=True, null=True,
        verbose_name="Tu respuesta",
        help_text="Escribí acá la respuesta y guardá. Se va a publicar automáticamente en la web.",
    )
    respondido_por = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        verbose_name="Respondida por",
    )
    fecha_respuesta = models.DateTimeField(null=True, blank=True, verbose_name="Fecha de respuesta")

    class Meta:
        verbose_name = "Pregunta"
        verbose_name_plural = "Preguntas"
        ordering = ['-fecha_creacion']

    def __str__(self):
        return self.contenido[:50]