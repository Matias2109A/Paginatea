import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Fotter() {
return (
    <footer className="footer">
      <img alt="Tea-MO" className="footer__logo" src="../src/assets/logo.jpeg" />
      <p className="nunito-font footer__title">Tea-MO · Comunidad para la Neurodivergencia</p>
      <p className="nunito-btn-font footer__location">Carcarañá, Santa Fe · Argentina</p>
      <p className="lora-font footer__credits">
    
      </p>
        <div className="footer__nav">
            <Link className="nunito-btn-font footer__nav-link" to="/">Inicio</Link>
            <Link className="nunito-btn-font footer__nav-link" to="/blog">Blog</Link>
            <Link className="nunito-btn-font footer__nav-link" to="/eventos">Eventos</Link>
            <Link className="nunito-btn-font footer__nav-link" to="/contactos">Contactos</Link>
        </div>
    </footer>
  );
}