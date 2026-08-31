import { useState } from 'react'
import './Valores.css'

const valoresData = [
    {
        letra: 'M',
        titulo: 'Misión',
        texto: 'Promover una mayor comprensión del autismo dentro de la sociedad, reconociéndolo como parte de la neurodiversidad. Trabajamos para brindar apoyo a las personas autistas y sus familias, favoreciendo su inclusión y contribuyendo a mejorar su calidad de vida.',
        destacada: false,
    },
    {
        letra: 'V',
        titulo: 'Valores',
        texto: 'Nos guiamos por la inclusión, el respeto, la empatía, la diversidad y la solidaridad. Creemos en la importancia de aceptar y valorar las diferencias, promoviendo una sociedad más informada y libre de prejuicios.',
        destacada: true,
    },
    {
        letra: 'V',
        titulo: 'Visión',
        texto: 'Construir una sociedad más inclusiva, empática y accesible, donde las personas autistas sean comprendidas, respetadas y cuenten con las oportunidades y apoyos necesarios para desarrollarse plenamente.',
        destacada: false,
    },
]

export default function Valores() {
    const [abierta, setAbierta] = useState(null)

    function toggle(i) {
        setAbierta(abierta === i ? null : i)
    }

    return (
        <section className='valores-conteiner'>
            <h2 className='nunito-font title-valores'>Misión · Visión · Valores</h2>
            <div className='cards-conteiner'>
                {valoresData.map((v, i) => (
                    <div key={i} className={`card-valores ${v.destacada ? 'card-mid-valores' : ''}`}>
                        <button
                            className='card-valores-toggle'
                            onClick={() => toggle(i)}
                            aria-expanded={abierta === i}
                        >
                            <span className={`nunito-font card-letter ${v.destacada ? 'mid-letter' : ''}`}>{v.letra}</span>
                            <h3 className={`nunito-font title-card-valores ${v.destacada ? 'mid-card' : ''}`}>{v.titulo}</h3>
                            <span className={`card-valores-icono ${v.destacada ? 'mid-card' : ''}`} style={{marginLeft: 'auto'}}>
                                {abierta === i ? '−' : '+'}
                            </span>
                        </button>

                        <p className={`lora-font desc-card-valores ${v.destacada ? 'mid-card' : ''} ${abierta === i ? '' : 'oculta'}`}>
                            {v.texto}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}