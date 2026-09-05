import './Neurodivergencia.css';
import NeurodivImg1 from '../../assets/imgs-inicio/img-tea-mo-4.jpg'
import NeurodivImg2 from '../../assets/imgs-inicio/img-tea-mo-3.jpg'

export default function Neurodivergencia() {
    return (
        <section id='neurodivergencia' className='conteiner-neurodivergencia'>
            <div className='neurodivergencia'>
                <div className='neurodivergencia-left'>
                    <h2 className='nunito-font title-neurodiv'>Neurodivergencia</h2>
                    <p className='lora-font txt-neurodiv-left'>La neurodivergencia es un concepto que reconoce que todas las personas procesamos la información, aprendemos, nos comunicamos y experimentamos el mundo de maneras diferentes. Estas diferencias forman parte de la diversidad humana y no deben ser vistas como algo que necesita ser corregido, sino comprendido y respetado.</p>
                    <p className='lora-font txt-neurodiv-left'>Dentro de la neurodivergencia se encuentran condiciones como el autismo, el TDAH, la dislexia y otras formas de funcionamiento neurológico. Cada persona tiene características, fortalezas y necesidades propias.</p>
                    <p className="nunito-font txt-neurodiv-left subtitle-neurodiv">Una mirada diferente. </p>
                    <p className="lora-font txt-neurodiv-left">No se trata de cambiar a las personas, sino de cambiar la forma en que entendemos y acompañamos las diferencias.</p>

                    <div className='burbujas'>
                        <span className='nunito-btn-font burbuja-ind'>Comprender</span>
                        <span className='nunito-btn-font burbuja-ind'>Respetar</span>
                        <span className='nunito-btn-font burbuja-ind'>Incluir</span>
                    </div>

                </div>
                <div className='neurodivergencia-right'>

                    <img className='item-grid item-1' src={NeurodivImg1}/>
                    <img className='item-grid item-2' src={NeurodivImg2}/>
                    <div className='item-grid item-3'> 
                        <h3 className='nunito-font item-3-title'>∞</h3>
                        <p className='nunito-btn-font item-3-desc'>Posibilidades para cada persona</p>
                    </div>
                </div>
            </div>
        </section>
    )
}