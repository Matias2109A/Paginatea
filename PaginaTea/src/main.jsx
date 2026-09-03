import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Nav from './components/Nav'
import PaginaPrincipal from './PaginaPrincipal'
import Blog from './pages/Blog/Blog'
import Eventos from './pages/Eventos/Eventos'
import Contactos from './pages/Contacto/Contactos'
import Fotter from './components/Footer'
import Error404 from './pages/Error404/Error404'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Nav paginaActiva='Inicio' />
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/contactos" element={<Contactos />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
    <Fotter />
  </BrowserRouter>
  </StrictMode>
)
