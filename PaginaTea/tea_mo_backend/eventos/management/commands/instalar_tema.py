import shutil
from django.conf import settings
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Copia el logo y el favicon de TEA-MO a media/, y carga el tema visual del panel."

    def handle(self, *args, **options):
        archivos = [
            ('logo.jpeg', settings.MEDIA_ROOT / 'admin-interface' / 'logo' / 'logo.jpeg'),
            ('favicon.png', settings.MEDIA_ROOT / 'admin-interface' / 'favicon' / 'favicon.png'),
        ]

        for nombre_origen, destino in archivos:
            origen = settings.BASE_DIR / 'logo' / nombre_origen

            if not origen.exists():
                self.stdout.write(self.style.WARNING(
                    f"No encontré {origen} — lo salteo (revisá si hace falta agregarlo al repo)."
                ))
                continue

            destino.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy(origen, destino)
            self.stdout.write(self.style.SUCCESS(f"Copiado: {destino}"))

        call_command('loaddata', 'fixtures/tema_teamo.json')
        self.stdout.write(self.style.SUCCESS(" Tema TeaMo aplicado correctamente."))
