import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav'
import Inicio from './pages/Inicio'

createRoot(document.getElementById('root')).render(
  <>
    <Nav />
    <Inicio />
  </>,
)
