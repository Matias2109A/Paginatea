import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav'
import Inicio from './pages/Inicio/Inicio'
import Introduccion from './pages/Introduccion/Introduccion'
import Historia from './pages/Historia/Historia'
import Neurodivergencia from './pages/Neurodivergencia/Neurodivergencia'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav paginaActiva='Inicio' />
    <Inicio />
    <Introduccion />
    <Historia />
    <Neurodivergencia />
  </StrictMode>,
)
