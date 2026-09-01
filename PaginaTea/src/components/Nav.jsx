import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import { useEffect } from 'react';

const linkClass = ({ isActive }) =>
    `nunito-btn-font nav-link${isActive ? ' active' : ''}`;

export default function Nav() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [visible, setVisible] = useState(true);
    const ultimoScrollY = useRef(0);

    function cerrarMenu() {
        setMenuAbierto(false);
    }

    useEffect(() => {
        const controlarScroll = () => {
            const scrollActual = window.scrollY;

            if (scrollActual > ultimoScrollY.current && scrollActual > 70) {
                setVisible(false);
                setMenuAbierto(false);
            } else {
                setVisible(true);
            }

            ultimoScrollY.current = scrollActual;
        };

        window.addEventListener('scroll', controlarScroll);

        return () => {
            window.removeEventListener('scroll', controlarScroll);
        };
    }, []);

    return (
        <header className={`header-nav ${visible ? 'header-visible' : 'header-oculto'}`}>
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