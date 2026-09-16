from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from registros.models import RegistroLog


class Command(BaseCommand):
    help = "Borra los registros del sistema más viejos que N días (por defecto, 90)."

    def add_arguments(self, parser):
        parser.add_argument(
            '--dias', type=int, default=90,
            help="Antigüedad en días a partir de la cual se borran los registros (default: 90).",
        )
        parser.add_argument(
            '--simular', action='store_true',
            help="Muestra cuántos se borrarían, sin borrar nada.",
        )

    def handle(self, *args, **options):
        limite = timezone.now() - timedelta(days=options['dias'])
        viejos = RegistroLog.objects.filter(fecha__lt=limite)
        cantidad = viejos.count()

        if cantidad == 0:
            self.stdout.write("No hay registros viejos para borrar.")
            return

        if options['simular']:
            self.stdout.write(f"Se borrarían {cantidad} registro(s) (modo simulación).")
            return

        viejos.delete()
        self.stdout.write(self.style.SUCCESS(f"Se borraron {cantidad} registro(s) anteriores a {limite:%d/%m/%Y}."))
