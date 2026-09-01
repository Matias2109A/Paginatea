import shutil
from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Copia el logo de TEA-MO a media/ y carga el tema visual del panel (colores, título, etc.)."

    def handle(self, *args, **options):
        origen = settings.BASE_DIR / 'logo' / 'logo.jpeg'
        destino_carpeta = settings.MEDIA_ROOT / 'admin-interface' / 'logo'
        destino = destino_carpeta / 'logo.jpeg'

        if not origen.exists():
            self.stdout.write(self.style.ERROR(
                f"No encontré el logo en {origen}. "
                "Confirmá que el archivo tea_mo_backend/logo/logo.jpeg exista en el repo."
            ))
            return

        destino_carpeta.mkdir(parents=True, exist_ok=True)
        shutil.copy(origen, destino)
        self.stdout.write(self.style.SUCCESS(f"Logo copiado a {destino}"))

        call_command('loaddata', 'fixtures/tema_teamo.json')
        self.stdout.write(self.style.SUCCESS("✔ Tema TeaMo aplicado correctamente."))
