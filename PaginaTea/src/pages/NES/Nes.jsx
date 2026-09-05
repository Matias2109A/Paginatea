import { useState } from 'react'
import './Nes.css'

const nesData = [
    {
        numero: 1,
        titulo: 'Primeras señales',
        texto: 'Cada niño se desarrolla a su propio ritmo, pero algunas señales pueden indicar la necesidad de realizar una consulta con profesionales especializados: dificultades en la comunicación, escaso contacto visual, intereses muy específicos, sensibilidad a ciertos sonidos o cambios en las rutinas.',
    },
    {
        numero: 2,
        titulo: 'Proceso del diagnóstico',
        texto: 'El diagnóstico es realizado por profesionales especializados mediante evaluaciones y observaciones del desarrollo del niño. Este proceso permite comprender mejor sus necesidades y fortalezas, y orientar a la familia sobre los apoyos más adecuados',
    },
    {
        numero: 3,
        titulo: 'Pasos post diagnóstico',
        texto: 'Recibir un diagnóstico puede generar muchas emociones y dudas. Lo más importante es recordar que no están solos. Informarse con fuentes confiables, consultar a profesionales, conocer los derechos disponibles y buscar redes de apoyo son pasos fundamentales.',
    },
]

export default function Nes() {
    const [abierta, setAbierta] = useState(null)

    function toggle(i) {
        setAbierta(abierta === i ? null : i)
    }

    return (
        <section id='nes' className='nes-conteiner'>
            <div className="nes">
                <h2 className='nunito-font title-nes'>TEA-COMPAÑAMOS</h2>
                <p className='nunito-btn-font desc-nes'>Una guía para la familia</p>

                <div className='cards-nes-conteiner'>
                    {nesData.map((item, i) => (
                        <article key={i} className='card-nes'>
                            <button
                                className='card-nes-toggle'
                                onClick={() => toggle(i)}
                                aria-expanded={abierta === i}
                            >
                                <span className='nunito-font number-card-nes'>{item.numero}</span>
                                <h4 className='nunito-font card-title-nes'>{item.titulo}</h4>
                                <span className='card-nes-icono'>{abierta === i ? '−' : '+'}</span>
                            </button>
                            <p className={`lora-font card-desc-nes ${abierta === i ? '' : 'oculta'}`}>
                                {item.texto}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}