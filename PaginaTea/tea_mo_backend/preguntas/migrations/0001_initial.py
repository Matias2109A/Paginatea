import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('autor_nombre', models.CharField(max_length=100)),
                ('autor_email', models.EmailField(blank=True, max_length=254)),
                ('contenido', models.TextField()),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('respuesta', models.TextField(blank=True, null=True)),
                ('fecha_respuesta', models.DateTimeField(blank=True, null=True)),
                ('respondido_por', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]


