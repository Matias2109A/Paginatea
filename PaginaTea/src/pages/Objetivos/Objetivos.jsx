import './Objetivos.css'

export default function Objetivos() {
    return(
        <section className='objetivos-container'>
            <h2 className='nunito-font title-objetivos'>Objetivos</h2>
            <article className='articulo-princ-obj'>
                <p className='nunito-btn-font title-objetivos-princ'>Principal</p>
                <p className='lora-font desc-objetivos-princ'>Promover la inclusión y el acompañamiento de las personas autistas y sus <br/> familias, fomentando una sociedad más informada y empática.</p>
            </article>

            <div className='articles-obj'>
                <article className='article-obj-izq'>
                    <h3 className='nunito-font objetivo-plazo'>A largo plazo</h3>
                    <p className='lora-font'>Aspiramos a ampliar nuestra red de apoyo, llegar a más familias y seguir promoviendo una mayor comprensión del autismo, contribuyendo a la construcción de una sociedad más inclusiva y respetuosa.</p>
                </article>
                <article className='article-obj-der'>
                    <h3 className='nunito-font objetivo-plazo'>A corto plazo</h3>
                    <p className='lora-font'>Continuar desarrollando capacitaciones, actividades de concientización y espacios de encuentro que brinden apoyo a las familias y favorezcan el desarrollo de habilidades y vínculos en niños y jóvenes.</p>
                </article>
            </div>
        </section>
    )
}