import logging


class DatabaseLogHandler(logging.Handler):

    def emit(self, record):
        from .models import RegistroLog

        try:
            RegistroLog.objects.create(
                nivel=record.levelname if record.levelname in RegistroLog.Nivel.values else 'INFO',
                categoria=getattr(record, 'categoria', RegistroLog.Categoria.OTRO),
                mensaje=record.getMessage(),
                ip=getattr(record, 'ip', None) or None,
                user_agent=(getattr(record, 'user_agent', '') or '')[:200],
                usuario=(getattr(record, 'usuario', '') or '')[:150],
            )
        except Exception:
            pass
