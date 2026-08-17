from django.urls import path
from .views import PreguntaListCreate

urlpatterns = [
    path('preguntas/', PreguntaListCreate.as_view(), name='preguntas'),
]