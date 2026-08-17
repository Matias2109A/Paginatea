# Filtro para los inputs de /preguntas/

import re

# Lista de palabras prohibidas, en minúscula y sin acentos.
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
    # Sumar mas palabras
}

PATRON_CARACTERES_VALIDOS = re.compile(
    r"^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.\,\;\:\¿\?\¡\!\-\'\"()]+$"
)

PATRON_URL = re.compile(r"(https?://|www\.)", re.IGNORECASE)

# Si el mismo caracter se repite muchas veces seguidas ("aaaaaaaa",
PATRON_REPETICION = re.compile(r"(.)\1{5,}")


def _quitar_acentos(texto):
    reemplazos = str.maketrans("áéíóúÁÉÍÓÚñÑüÜ", "aeiouAEIOUnNuU")
    return texto.translate(reemplazos)


def contiene_palabra_prohibida(texto):
    """Devuelve True si el texto contiene alguna palabra de la lista negra."""
    texto_normalizado = _quitar_acentos(texto).lower()
    # \b marca límite de palabra, para no confundir "clase" con "as" por ejemplo
    palabras_en_texto = set(re.findall(r"\b\w+\b", texto_normalizado))
    return not PALABRAS_PROHIBIDAS.isdisjoint(palabras_en_texto)


def tiene_caracteres_invalidos(texto):
    """Devuelve True si el texto trae caracteres fuera de lo permitido."""
    return not PATRON_CARACTERES_VALIDOS.match(texto)


def contiene_url(texto):
    return bool(PATRON_URL.search(texto))


def tiene_repeticion_sospechosa(texto):
    return bool(PATRON_REPETICION.search(texto))


def validar_texto(texto):

    texto = texto.strip()

    if not texto:
        return "Este campo es obligatorio."

    if contiene_palabra_prohibida(texto):
        return "Tu mensaje incluye lenguaje que no podemos publicar. Te pedimos que lo reformules con respeto."

    if tiene_caracteres_invalidos(texto):
        return "El texto incluye caracteres no admitidos. Usá solo letras, números y signos de puntuación habituales."

    if contiene_url(texto):
        return "Por motivos de seguridad, no se permiten enlaces en las preguntas."

    if tiene_repeticion_sospechosa(texto):
        return "El texto no parece una pregunta válida. Revisalo e intentá nuevamente."

    return None
