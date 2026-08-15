import './Introduccion.css';
import infiniteImg from '../../assets/img-infinito.svg';

export default function Introduccion() {
    return (
        <section className='conteiner-introduccion'>
            <div className='introduccion'>
                <img className='infinite-img' src={infiniteImg} />
                <h2 className='nunito-font title-introduccion'>Introducción</h2>
                <p className='lora-font texto1'>"Comunidad para la Neurodivergencia" es una asociación formada por familias de personas autistas que trabaja en el acompañamiento, la orientación y la concientización sobre el autismo. Su objetivo principal es brindar información, apoyo y espacios de contención a las familias, además de promover una sociedad más inclusiva y respetuosa de la neurodiversidad.</p>
                <p className='lora-font texto2'>Actualmente, participan familias de Carcarañá y localidades vecinas, desarrollando actividades, capacitaciones y acciones de visibilización para la comunidad.</p>
            </div>
        </section>
    )
}