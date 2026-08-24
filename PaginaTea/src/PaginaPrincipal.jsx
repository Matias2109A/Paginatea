import Inicio from './pages/Inicio/Inicio'
import Introduccion from './pages/Introduccion/Introduccion'
import Historia from './pages/Historia/Historia'
import Neurodivergencia from './pages/Neurodivergencia/Neurodivergencia'
import Valores from './pages/Valores/Valores'
import Objetivos from './pages/Objetivos/Objetivos'
import Oferta from './pages/Oferta/Oferta'
import Impacto from './pages/Impacto/Impacto'
import Nes from './pages/NES/Nes'
import Conocimiento from './pages/Conocimiento/Conocimiento'

export default function PaginaPrincipal() {
    return (
        <>
            <Inicio />
            <Introduccion />
            <Historia />
            <Neurodivergencia />
            <Valores />
            <Objetivos />
            <Oferta />
            <Impacto />
            <Nes />
            <Conocimiento />
        </ >
    )
}