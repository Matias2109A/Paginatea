import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import Inicio from './pages/Inicio/Inicio'
import Introduccion from './pages/Introduccion/Introduccion'
import Historia from './pages/Historia/Historia'
import Neurodivergencia from './pages/Neurodivergencia/Neurodivergencia'
import Blog from './pages/Blog'
import Eventos from './pages/Eventos'
import Contactos from './pages/Contactos'
import Fotter from './components/Footer'

createRoot(document.getElementById('root')).render(
  <BrowserRouterStrictMode>
    <Nav paginaActiva='Inicio' />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/contactos" element={<Contactos />} />
    </Routes>
    <Introduccion />
    <Historia />
    <Neurodivergencia />
    <Fotter />
  </BrowserRouterStrictMode>
)
