import './Valores.css'

export default function Valores() {
    return(
        <section className='valores-conteiner'>
            <h2 className='nunito-font title-valores'>Misión · Visión · Valores</h2>
            <div className='cards-conteiner'>
                <div className='card-valores'>
                    <span className='nunito-font card-letter letter1'>M</span>
                    <h3 className='nunito-font title-card-valores'>Misión</h3>
                    <p className='lora-font desc-card-valores'>Promover una mayor comprensión del autismo dentro de la sociedad, reconociéndolo como parte de la neurodiversidad. Trabajamos para brindar apoyo a las personas autistas y sus familias, favoreciendo su inclusión y contribuyendo a mejorar su calidad de vida.</p>
                </div>
                <div className='card-valores card-mid-valores'>
                    <span className='nunito-font card-letter letter2'>V</span>
                    <h3 className='nunito-font title-card-valores mid-card'>Valores</h3>
                    <p className='lora-font desc-card-valores mid-card'>Nos guiamos por la inclusión, el respeto, la empatía, la diversidad y la solidaridad. Creemos en la importancia de aceptar y valorar las diferencias, promoviendo una sociedad más informada y libre de prejuicios.</p>
                </div>
                <div className='card-valores'>
                    <span className='nunito-font card-letter letter3'>V</span>
                    <h3 className='nunito-font title-card-valores'>Visión</h3>
                    <p className='lora-font desc-card-valores'>Construir una sociedad más inclusiva, empática y accesible, donde las personas autistas sean comprendidas, respetadas y cuenten con las oportunidades y apoyos necesarios para desarrollarse plenamente.</p>
                </div>
            </div>

        </section>
    )
}