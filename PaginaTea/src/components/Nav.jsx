import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const linkClass = ({ isActive }) =>
    `nunito-btn-font nav-link${isActive ? ' active' : ''}`;


export default function Nav({paginaActiva}) {
    return (
        <header>
            <nav>
                <img src="../src/assets/logo.jpeg" alt="Logo" />
                <ul>
                    <NavLink className={linkClass} to="/" end>Inicio</NavLink>
                    <NavLink className={linkClass} to="/blog">Blog</NavLink>
                    <NavLink className={linkClass} to="/eventos">Eventos</NavLink>
                    <NavLink className={linkClass} to="/contactos">Contactos</NavLink>
                </ul>
            </nav>
        </header>
    )
}