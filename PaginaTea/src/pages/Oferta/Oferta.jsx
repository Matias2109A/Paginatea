import './Oferta.css'
import { useState} from 'react'

const contenidoOferta = {
    acompañamiento: [
        {
            icono: '👂',
            titulo: 'Espacios de escucha',
            texto: 'Brindamos un lugar de contención donde las familias pueden expresar sus inquietudes, compartir sus experiencias y sentirse acompañadas.',
        },
        {
            icono: '🤝',
            titulo: 'Intercambio de experiencias',
            texto: 'Favorecemos el encuentro entre familias para compartir información, aprendizajes y vivencias.',
        },
        {
            icono: '🌐',
            titulo: 'Red de apoyo',
            texto: 'Promovemos vínculos basados en la empatía y el acompañamiento mutuo entre las familias y la comunidad.',
        }
    ],

    actividades: [
        {
            icono: '📚',
            titulo: 'Capacitaciones',
            texto: 'Organizamos jornadas de formación para familias, docentes y la comunidad en general.',
        },
        {
            icono: '💬',
            titulo: 'Charlas informativas',
            texto: 'Generamos espacios para difundir información y promover una mayor comprensión del autismo.',
        },
        {
            icono: '🎯',
            titulo: 'Jornadas de concientización',
            texto: 'Realizamos actividades que fomentan el respeto, la inclusión y la sensibilización social.',
        },
        {
            icono: '🎨',
            titulo: 'Talleres y encuentros',
            texto: 'Desarrollamos propuestas que favorecen la participación, la socialización y el fortalecimiento de vínculos.',
        }
    ],

    recursos: [
        {
            icono: '🩺',
            titulo: 'Orientación profesional',
            texto: 'Compartimos información sobre especialistas y recursos disponibles en la región.',
        },
        {
            icono: '⚖️',
            titulo: 'Derechos y apoyos',
            texto: 'Brindamos asesoramiento sobre beneficios, programas y herramientas de apoyo.',
        },
        {
            icono: '📋',
            titulo: 'Acompañamiento en trámites',
            texto: 'Guiamos a las familias en diferentes gestiones y procesos relacionados con las necesidades de cada persona.',
        }
    ]
};

export default function Oferta() {
    const [tabActiva, setTabActiva] = useState('acompañamiento')
    return(
        <section className='oferta-conteiner'>
            <h2 className='nunito-font title-oferta'>Lo que ofrecemos</h2>
            <p className='nunito-btn-font desc-oferta'>Tres pilares que sostienen nuestro trabajo comunitario</p>

            <div className='btns-oferta'>
                <button className={`nunito-btn-font btn-oferta ${tabActiva === 'acompañamiento' ? 'btn-oferta-active' : ''}`}onClick={() => setTabActiva('acompañamiento')}>Acompañamiento</button>
                <button className={`nunito-btn-font btn-oferta ${tabActiva === 'actividades' ? 'btn-oferta-active' : ''}`}onClick={() => setTabActiva('actividades')}>Actividades</button>
                <button className={`nunito-btn-font btn-oferta ${tabActiva === 'recursos' ? 'btn-oferta-active' : ''}`}onClick={() => setTabActiva('recursos')}>Recursos</button>
            </div>

            <div className={`cards-conteiner-oferta ${tabActiva === 'actividades' ? 'grid-2-cols' : 'grid-3-cols'}`}>
              {contenidoOferta[tabActiva].map((item, index) => (
                <div key={index} className='card-oferta card-horizontal'>
                   <span className='card-oferta-icono'>{item.icono}</span>
                   <h4 className='nunito-font card-oferta-titulo'>{item.titulo}</h4>
                   <p className='lora-font card-oferta-desc'>{item.texto}</p>
                </div>
              ))}
            </div>

        </section>
    )
}