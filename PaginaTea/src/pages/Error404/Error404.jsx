import './Error404.css'

export default function Error404() {
    return (
        <section className="error404">

        <div className="caja">
            <div className="icono">🧩</div>
                <h1 className='title-error'>No encontramos esta página</h1>
                <p className='txt-error'>Puede que el enlace esté roto o que la dirección tenga un error. Volvé al inicio para seguir navegando.</p>
                <a className="boton" href="/">Volver al inicio</a>
        </div>
        </section>
    )
}