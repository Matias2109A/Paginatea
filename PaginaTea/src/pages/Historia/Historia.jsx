import './Historia.css'
import historiaImg from '../../assets/imgs-inicio/img-tea-mo-1.jpg'

export default function Historia() {
    return (
        <section className='conteiner-historia'>
            <div className='historia'>
                <div className='historia-left'>
                    <img className='img-historia' src={historiaImg} />
                    <div className='cuadro-text-historia'>
                        <p className='nunito-font txt-cuadro-img'>"Sólo una</p>
                        <p className='nunito-font txt-cuadro-img'>forma distinta"</p>
                    </div>
                </div>
                <div className='historia-right'>
                    <span className='nunito-btn-font pre-title-historia'>¿Cómo se formó?</span>
                    <h2 className='nunito-font title-historia'>Historia</h2>
                    <p className='lora-font txt-historia-right'>Nuestra comunidad nació a partir de la necesidad compartida de varias familias que, al recibir un diagnóstico de autismo para sus hijos, se encontraron frente a una realidad desconocida y con la necesidad de buscar información y acompañamiento.</p>
                    <p className='lora-font txt-historia-right'>Lo que comenzó como encuentros para compartir experiencias e intercambiar conocimientos fue creciendo hasta convertirse en una red de contención y una asociación comprometida con la inclusión.</p>
                    <p className='lora-font txt-historia-right'>Desde entonces, trabajamos para construir una comunidad más informada, empática y respetuosa de la diversidad.</p>
                </div>
            </div>
        </section>
    )
}