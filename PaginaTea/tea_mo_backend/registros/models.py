from django.db import models


class RegistroLog(models.Model):

    class Nivel(models.TextChoices):
        INFO = 'INFO', 'Informativo'
        WARNING = 'WARNING', 'Advertencia'
        ERROR = 'ERROR', 'Error'

    class Categoria(models.TextChoices):
        PREGUNTA_NUEVA = 'pregunta_nueva', 'Pregunta recibida'
        PREGUNTA_RECHAZADA = 'pregunta_rechazada', 'Pregunta rechazada por moderación'
        LIMITE_ENVIOS = 'limite_envios', 'Envío bloqueado por límite'
        EVENTO_NUEVO = 'evento_nuevo', 'Evento cargado'
        SUSCRIPCION = 'suscripcion', 'Suscripción a eventos'
        EMAIL = 'email', 'Envío de email'
        OTRO = 'otro', 'Otro'

    fecha = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Fecha")
    nivel = models.CharField(
        max_length=10, choices=Nivel.choices, default=Nivel.INFO,
        db_index=True, verbose_name="Nivel",
    )
    categoria = models.CharField(
        max_length=30, choices=Categoria.choices, default=Categoria.OTRO,
        db_index=True, verbose_name="Categoría",
    )
    mensaje = models.TextField(verbose_name="Detalle")
    ip = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP")
    user_agent = models.CharField(max_length=200, blank=True, verbose_name="Navegador / dispositivo")
    usuario = models.CharField(max_length=150, blank=True, verbose_name="Cuenta del staff")

    class Meta:
        verbose_name = "Registro del sistema"
        verbose_name_plural = "Registros del sistema"
        ordering = ['-fecha']

    def __str__(self):
        return f"[{self.nivel}] {self.get_categoria_display()} — {self.fecha:%d/%m/%Y %H:%M}"
