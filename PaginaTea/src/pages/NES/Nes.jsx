import './Nes.css'

export default function Nes() {
    return(
        <section id='nes' className='nes-conteiner'>
            <div className="nes">

                <h2 className='nunito-font title-nes'>No están solos</h2>
                <p className='nunito-btn-font desc-nes'>Una guía para la familia</p>
        
                <div className='cards-nes-conteiner'>
                    <article className='card-nes'>
                        <div className='nunito-font number-card-nes'>1</div>
                        <h4 className='nunito-font card-title-nes'>Primeras señales</h4>
                        <p className='lora-font card-desc-nes'>Cada niño se desarrolla a su propio ritmo, pero algunas señales pueden indicar la necesidad de realizar una consulta con profesionales especializados: dificultades en la comunicación, escaso contacto visual, intereses muy específicos, sensibilidad a ciertos sonidos o cambios en las rutinas.</p>
                    </article>
                    <article className='card-nes'>
                        <div className='nunito-font number-card-nes'>2</div>
                        <h4 className='nunito-font card-title-nes'>Proceso del diagnóstico</h4>
                        <p className='lora-font card-desc-nes'>El diagnóstico es realizado por profesionales especializados mediante evaluaciones y observaciones del desarrollo del niño. Este proceso permite comprender mejor sus necesidades y fortalezas, y orientar a la familia sobre los apoyos más adecuados</p>
                    </article>
                    <article className='card-nes'>
                        <div className='nunito-font number-card-nes'>3</div>
                        <h4 className='nunito-font card-title-nes'>Pasos post diagnóstico</h4>
                        <p className='lora-font card-desc-nes'>Recibir un diagnóstico puede generar muchas emociones y dudas. Lo más importante es recordar que no están solos. Informarse con fuentes confiables, consultar a profesionales, conocer los derechos disponibles y buscar redes de apoyo son pasos fundamentales.</p>
                    </article>
                </div>
        
                <article className='card-nes-full'>
                    <h3 className='nunito-font card-nes-full-title'>"Cada persona es única y tiene su propio camino."</h3>
                    <p className='nunito-btn-font card-nes-full-desc'>Tea-MO · Comunidad para la Neurodivergencia · Carcarañá</p>
                </article>
            </div>
        </section>
    )
}