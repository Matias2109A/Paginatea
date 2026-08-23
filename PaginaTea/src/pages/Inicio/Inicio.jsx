import './Inicio.css'
import infiniteImg from '../../assets/img-infinito.svg'

export default function Inicio() {
    return (
        <main>
            <section className='hero-container'>
                <div className='hero'>
                    <img className='infinite-img' src={infiniteImg} />
                    <p className='nunito-btn-font hero-ubi'>Carcarañá · Santa Fe · Argentina</p>
                    
                    <h1 className='nunito-font title'>
                        COMUNIDAD PARA LA 
                        <span className='nunito-font title-span'>NEURODIVERGENCIA</span>
                    </h1>

                    <p className='lora-font hero-desc'>Acompañamos, informamos e incluimos. Una red de familias que camina junta hacia una sociedad más empática y  diversa.</p>

                    <div className='hero-btns'>
                        <a className='nunito-btn-font hero-btn conocemas' href="#">Conocé más</a>
                        <a className='nunito-btn-font hero-btn guia' href="#">Guía para familias</a>
                    </div>

                    <div className='hero-cards'>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-1'>48,4%</h2>
                            <p className='nunito-font hero-card-desc'>Bajo conocimiento en la comunidad</p>
                        </article>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-2'>100%</h2>
                            <p className='nunito-font hero-card-desc'>Familias contenidas</p>
                        </article>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-3'>∞</h2>
                            <p className='nunito-font hero-card-desc'>Posibilidades de cada persona</p>
                        </article>
                         <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-4'>+1</h2>
                            <p className='nunito-font hero-card-desc'>Red de apoyo activa</p>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
}