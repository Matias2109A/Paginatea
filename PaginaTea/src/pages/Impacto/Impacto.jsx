import './Impacto.css'
import imgImpacto from '../../assets/imgs-inicio/img-tea-mo-2.jpg'

export default function Impacto() {
    return(
        <section className='impacto-conteiner'>
            <div className='impacto-grid-conteiner'>
                <div>
                    <p className='nunito-btn-font pretitle-impacto'>Impacto real</p>
                    <h2 className='nunito-font title-impacto'>Impacto en las familias</h2>
                    <p className='lora-font parrafo-impacto'>A través del acompañamiento y la contención que brindamos, muchas familias dejan de sentirse solas y encuentran un espacio donde compartir experiencias, expresar sus inquietudes y recibir apoyo de otras personas que atraviesan situaciones similares.</p>
                    <p className='lora-font parrafo-impacto'>Además, el acceso a información confiable, recursos y orientación les permite afrontar cada etapa con mayor tranquilidad y seguridad, facilitando la toma de decisiones y el acceso a los apoyos necesarios.</p>
                </div>
                <div>
                    <img className='img-impacto' src={imgImpacto}/>
                </div>
            </div>
        </section>
    )
}