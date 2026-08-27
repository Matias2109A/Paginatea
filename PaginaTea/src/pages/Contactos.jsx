import './Contactos.css'

const abrirCorreo = (e) => {
    e.preventDefault();
    window.open(
        "https://mail.google.com/mail/?view=cm&fs=1&to=padresautismocarc@gmail.com",
        "compose",
        "width=600,height=500"
    );
};

export default function Contactos() {
    return (
        <main>
            <section className='contactos-container'>
                <h1 className='nunito-font contactos-title'>Contactos</h1>
                <p className='lora-font contactos-desc'>
                    Escribinos o seguinos en nuestras redes. Estamos para acompañarte.
                </p>

                <div className='contactos-grid'>
                    
                        
                    <a className='contact-card'
                        onClick={abrirCorreo}
                        >
                    
                        <span className='contact-icon contact-icon--email'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6L12 13L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </span>
                        <div>
                            <p className='nunito-btn-font contact-label'>Correo electrónico</p>
                            <p className='nunito-font contact-value'>padresautismocarc@gmail.com</p>
                        </div>
                    </a>
                        
                    <a  className='contact-card contact-card--featured'
                        href="https://www.instagram.com/padres.autismo.carcarana/"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <span className='contact-icon contact-icon--instagram'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                            </svg>
                        </span>
                        <div>
                            <p className='nunito-btn-font contact-label'>Instagram</p>
                            <p className='nunito-font contact-value'>@PADRES.AUTISMO.CARCARAÑÁ</p>
                        </div>
                    </a>

                    <a  className='contact-card'
                        href="https://www.facebook.com/padresautismo.carcarana?locale=es_LA"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <span className='contact-icon contact-icon--facebook'>
                            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z"/>
                            </svg>
                        </span>
                        <div>
                            <p className='nunito-btn-font contact-label'>Facebook</p>
                            <p className='nunito-font contact-value'>ORGANIZACIÓN PADRES AUTISMO CARCARAÑÁ.</p>
                        </div>
                    </a>

                    <a  className='contact-card'
                        href="https://wa.me/5493471583942"
                        target="_blank"
                        rel="noopener noreferrer">
                        
                        <span className='contact-icon contact-icon--phone'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4c0 1.1-.9 2-2 2C10.5 21 3 13.5 3 6c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <div>
                            <p className='nunito-btn-font contact-label'>Teléfono / WhatsApp</p>
                            <p className='nunito-font contact-value'>+54 9 3471 583 942</p>
                        </div>
                    </a>
                </div>

                <div className='contactos-cta'>
                    <h2 className='nunito-font contactos-cta-title'>¿Querés sumarte?</h2>
                    <p className='lora-font contactos-cta-desc'>
                        Si sos familia de una persona autista o querés colaborar con nuestra comunidad, escribinos. ¡Nos encantaría conocerte!
                    </p>
                </div>
            </section>
        </main>
    )
}