import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import PaginaPrincipal from './PaginaPrincipal'
import Blog from './pages/Blog'
import Eventos from './pages/Eventos'
import Contactos from './pages/Contactos'
import Fotter from './components/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Nav paginaActiva='Inicio' />
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/contactos" element={<Contactos />} />
    </Routes>
    <Fotter />
  </BrowserRouter>
  </StrictMode>
)
