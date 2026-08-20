import re

# Lista de palabras prohibidas, en minúscula y sin acentos.
# Agregá o sacá palabras acá según haga falta — una por línea, en minúscula.
PALABRAS_PROHIBIDAS = {
    "boludo",
    "pelotudo",
    "forro",
    "puto",
    "puta",
    "mierda",
    "idiota",
    "estupido",
    "imbecil",
    "carajo",
    "conchudo",
    "gil",
    # sumá las que necesites
}


PATRON_CARACTERES_VALIDOS = re.compile(
    r"^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.\,\;\:\¿\?\¡\!\-\'\"()]+$"
)


PATRON_URL = re.compile(r"(https?://|www\.)", re.IGNORECASE)

PATRON_REPETICION = re.compile(r"(.)\1{5,}")


def _quitar_acentos(texto):
    reemplazos = str.maketrans("áéíóúÁÉÍÓÚñÑüÜ", "aeiouAEIOUnNuU")
    return texto.translate(reemplazos)


def contiene_palabra_prohibida(texto):
    texto_normalizado = _quitar_acentos(texto).lower()
    palabras_en_texto = set(re.findall(r"\b\w+\b", texto_normalizado))
    return not PALABRAS_PROHIBIDAS.isdisjoint(palabras_en_texto)


def tiene_caracteres_invalidos(texto):
    return not PATRON_CARACTERES_VALIDOS.match(texto)


def contiene_url(texto):
    return bool(PATRON_URL.search(texto))


def tiene_repeticion_sospechosa(texto):
    return bool(PATRON_REPETICION.search(texto))


def validar_texto(texto):
    texto = texto.strip()

    if not texto:
        return ("vacío", "Este campo es obligatorio.")

    if contiene_palabra_prohibida(texto):
        return ("lenguaje inapropiado", "Tu mensaje incluye lenguaje que no podemos publicar. Te pedimos que lo reformules con respeto.")

    if tiene_caracteres_invalidos(texto):
        return ("caracteres no permitidos", "El texto incluye caracteres no admitidos. Usá solo letras, números y signos de puntuación habituales.")

    if contiene_url(texto):
        return ("link no permitido", "Por motivos de seguridad, no se permiten enlaces en las preguntas.")

    if tiene_repeticion_sospechosa(texto):
        return ("repetición sospechosa", "El texto no parece una pregunta válida. Revisalo e intentá nuevamente.")

    return None
