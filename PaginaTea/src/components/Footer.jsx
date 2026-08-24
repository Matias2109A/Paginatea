import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Fotter() {
return (
    <footer className="footer">
      <div className="footer__info">

        <img alt="Tea-MO" className="footer__logo" src="../src/assets/logo.jpeg" />
        <p className="nunito-font footer__title">Tea-MO · Comunidad para la Neurodivergencia</p>
        <p className="nunito-btn-font footer__location">San Martín 1900, Carcarañá, Santa Fe · Argentina</p>
        <p className="lora-font footer__credits">

        </p>

          <div className="footer__nav">
              <Link className="nunito-btn-font footer__nav-link" to="/">Inicio</Link>
              <Link className="nunito-btn-font footer__nav-link" to="/blog">Blog</Link>
              <Link className="nunito-btn-font footer__nav-link" to="/eventos">Eventos</Link>
              <Link className="nunito-btn-font footer__nav-link" to="/contactos">Contactos</Link>
          </div>
      </div>

        <div className="footer__mapa">
        <iframe 
          className="mapa-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2011.6712520578967!2d-61.142713441868935!3d-32.857275171204314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6253320dd7c95%3A0x715d0b54c8032379!2sAv.%20San%20Mart%C3%ADn%201900%2C%20S2138%20Carcara%C3%B1a%2C%20Santa%20Fe!5e1!3m2!1ses!2sar!4v1787534718811!5m2!1ses!2sar" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="strict-origin-when-cross-origin">
        </iframe>
      </div>
    </footer>
  );
}