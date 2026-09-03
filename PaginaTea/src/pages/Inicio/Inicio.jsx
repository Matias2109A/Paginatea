import './Inicio.css'
import infiniteImg from '../../assets/img-infinito.svg'

export default function Inicio() {
    return (
        <main className='inicio-main'>
            <section className='hero-container' id='inicio'>
                <div className='hero'>
                    <img className='infinite-img' src={infiniteImg} />
                    <p className='nunito-btn-font hero-ubi'>Carcarañá · Santa Fe · Argentina</p>
                    
                    <h1 className='nunito-font title'>
                        <h1 className='nunito-font title'>
                            <span className='title-linea1'>COMUNIDAD PARA LA</span>
                            <span className='nunito-font title-span'>NEURODIVERGENCIA</span>
                        </h1>
                    </h1>

                    <p className='lora-font hero-desc'>Acompañamos, informamos e incluimos. Una red de familias que camina junta hacia una sociedad más empática y  diversa.</p>

                    <div className='hero-btns'>
                        <a className='nunito-btn-font hero-btn conocemas' href='#introduccion'>Conocé más</a>
                        <a className='nunito-btn-font hero-btn guia' href="#nes">Guía para familias</a>
                    </div>

                    <div className='hero-cards'>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-1'>CONOCER</h2>
                            <p className='nunito-font hero-card-desc'>Entender el autismo desde la informacion</p>
                        </article>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-2'>ENTENDER</h2>
                            <p className='nunito-font hero-card-desc'>Derribar mitos y prejuicios</p>
                        </article>
                        <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-3'>APOYAR</h2>
                            <p className='nunito-font hero-card-desc'>Brindar herramientas a familias y personas con autismo</p>
                        </article>
                         <article className='nunito-font hero-card'>
                            <h2 className='nunito-font hero-card-title card-4'>INCLUIR</h2>
                            <p className='nunito-font hero-card-desc'>Construir una sociedad más empática y diversa</p>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
}