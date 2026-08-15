import React from 'react';
import './Nav.css';



export default function Nav({paginaActiva}) {
    return (
        <header>
            <nav>
                <img src="../src/assets/logo.jpeg" alt="Logo" />
                <ul>
                    <a className={`nunito-btn-font ${paginaActiva === 'Inicio' ? 'nav-activo' : ''}`} href="/">Inicio</a>
                    <a className={`nunito-btn-font ${paginaActiva === 'Blog' ? 'nav-activo' : ''}`} href="#">Blog</a>
                    <a className={`nunito-btn-font ${paginaActiva === 'Eventos' ? 'nav-activo' : ''}`} href="#">Eventos</a>
                    <a className={`nunito-btn-font ${paginaActiva === 'Contacto' ? 'nav-activo' : ''}`} href="#">Contacto</a>
                    <a className={`nunito-btn-font ${paginaActiva === 'FAQ' ? 'nav-activo' : ''}`} href="#">FAQ</a>
                </ul>
            </nav>
        </header>
    )
}