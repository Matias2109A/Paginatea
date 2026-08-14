import React from 'react';
import './Nav.css';


export default function Nav() {
    return (
        <header>
            <nav>
                <img src="../src/assets/logo.jpeg" alt="Logo" />
                <ul>
                    <a className='nunito-btn-font' href="/">Inicio</a>
                    <a className='nunito-btn-font'href="#">Blog</a>
                    <a className='nunito-btn-font' href="#">Eventos</a>
                    <a className='nunito-btn-font' href="#">Contacto</a>
                    <a className='nunito-btn-font' href="#">FAQ</a>
                </ul>
            </nav>
        </header>
    )
}