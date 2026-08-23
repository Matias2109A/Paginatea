import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const linkClass = ({ isActive }) =>
    `nunito-btn-font nav-link${isActive ? ' active' : ''}`;

export default function Nav() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    return (
        <header>
            <nav>
                <img src="src/assets/logo.jpeg" alt="Logo" />

                <button
                    className='nav-toggle'
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label="Abrir menú"
                    aria-expanded={menuAbierto}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={menuAbierto ? 'nav-abierto' : ''}>
                    <NavLink className={linkClass} to="/" end onClick={cerrarMenu}>Inicio</NavLink>
                    <NavLink className={linkClass} to="/blog" onClick={cerrarMenu}>Blog</NavLink>
                    <NavLink className={linkClass} to="/eventos" onClick={cerrarMenu}>Eventos</NavLink>
                    <NavLink className={linkClass} to="/contactos" onClick={cerrarMenu}>Contactos</NavLink>
                </ul>
            </nav>
        </header>
    )
}