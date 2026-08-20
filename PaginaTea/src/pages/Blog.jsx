import { useState, useEffect } from 'react'
import './Blog.css'

// URL de la API de Django. En producción, cambiar por la URL real del backend.
const API_URL = 'http://127.0.0.1:8000/api/preguntas/'


const faqs = [
    {
        pregunta: "¿Qué es el TEA?",
        respuesta: "El Trastorno del Espectro Autista (TEA) es una condición del neurodesarrollo que afecta la comunicación, la interacción social y el comportamiento, y se manifiesta de forma distinta en cada persona.",
    },
    {
        pregunta: "¿Cómo puedo sumarme a la comunidad?",
        respuesta: "Podés escribirnos por cualquiera de nuestros medios de contacto (mail, Instagram, Facebook o WhatsApp) y te contamos cómo participar.",
    },
    {
        pregunta: "¿Las actividades tienen costo?",
        respuesta: "La mayoría de nuestras actividades son gratuitas. Si alguna tiene costo, se aclara al momento de difundirla.",
    },
]

export default function Blog() {
    const [preguntas, setPreguntas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [cargandoMas, setCargandoMas] = useState(false)
    const [siguienteUrl, setSiguienteUrl] = useState(null)
    const [errorCarga, setErrorCarga] = useState(null)
    const [errorEnvio, setErrorEnvio] = useState(null)
    const [form, setForm] = useState({ nombre: '', pregunta: '' })
    const [enviando, setEnviando] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)

    // Trae las preguntas de la API al cargar la página.
    useEffect(() => {
        cargarPreguntas()
    }, [])

    async function cargarPreguntas() {
        try {
            setCargando(true)
            const res = await fetch(API_URL)
            if (!res.ok) throw new Error('No se pudieron cargar las preguntas')
            const data = await res.json()
            setPreguntas(data.results)
            setSiguienteUrl(data.next)
            setErrorCarga(null)
        } catch (err) {
            setErrorCarga('No pudimos cargar las preguntas. Intentá de nuevo más tarde.')
        } finally {
            setCargando(false)
        }
    }

    async function cargarMasPreguntas() {
        if (!siguienteUrl) return
        try {
            setCargandoMas(true)
            const res = await fetch(siguienteUrl)
            if (!res.ok) throw new Error('No se pudieron cargar más preguntas')
            const data = await res.json()
            setPreguntas((prev) => [...prev, ...data.results])
            setSiguienteUrl(data.next)
        } catch (err) {
            setErrorCarga('No pudimos cargar más preguntas. Intentá de nuevo más tarde.')
        } finally {
            setCargandoMas(false)
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.nombre.trim() || !form.pregunta.trim()) return

        setEnviando(true)
        setErrorEnvio(null)
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    autor_nombre: form.nombre,
                    contenido: form.pregunta,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                if (res.status === 429) {
                    throw new Error('Enviaste varias preguntas seguidas. Esperá un poco antes de volver a intentar.')
                }
                // Django devuelve { autor_nombre: ["mensaje"], contenido: ["mensaje"] }
                const primerError = Object.values(data)[0]?.[0]
                throw new Error(primerError || 'No pudimos enviar tu pregunta. Intentá de nuevo.')
            }
            setPreguntas([data, ...preguntas])
            setForm({ nombre: '', pregunta: '' })
        } catch (err) {
            setErrorEnvio(err.message)
        } finally {
            setEnviando(false)
        }
    }

    function toggleFaq(index) {
        setOpenFaq(openFaq === index ? null : index)
    }

    return (
        <main>
            <section className='blog-container'>
                <span className='blog-icon'>✍️</span>
                <h1 className='nunito-font blog-title'>Preguntas y respuestas</h1>
                <p className='lora-font blog-desc'>
                    ¿Tenés una duda sobre neurodivergencia o autismo? Dejanos tu pregunta y te respondemos por acá.
                </p>

                {errorEnvio && (
                    <div className='form-error' role="alert">
                        <svg className='form-error-icon' viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M12 7.5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            <circle cx="12" cy="16.2" r="1" fill="currentColor" />
                        </svg>
                        <div className='form-error-texto'>
                            <p className='nunito-btn-font form-error-titulo'>No pudimos enviar tu pregunta</p>
                            <p className='lora-font form-error-mensaje'>{errorEnvio}</p>
                        </div>
                    </div>
                )}

                <form className='nunito-font pregunta-form' onSubmit={handleSubmit}>
                    <input
                        className='nunito-font pregunta-input'
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className='nunito-font pregunta-textarea'
                        name="pregunta"
                        placeholder="Escribí tu pregunta acá..."
                        rows={3}
                        value={form.pregunta}
                        onChange={handleChange}
                        required
                    />
                    <button className='nunito-btn-font pregunta-btn' type="submit" disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar pregunta'}
                    </button>
                </form>
            </section>

            <section className='preguntas-lista-container'>
                <h2 className='nunito-font seccion-title'>Preguntas de la comunidad</h2>
                {errorCarga && <p className='lora-font sin-preguntas'>{errorCarga}</p>}
                <div className='preguntas-lista'>
                    {cargando && (
                        <p className='lora-font sin-preguntas'>Cargando preguntas...</p>
                    )}
                    {!cargando && preguntas.length === 0 && (
                        <p className='lora-font sin-preguntas'>Todavía no hay preguntas. ¡Sé el primero en escribir!</p>
                    )}
                    {preguntas.map((p) => (
                        <article className='pregunta-card' key={p.id}>
                            <p className='nunito-font pregunta-card-nombre'>{p.autor_nombre}</p>
                            <p className='lora-font pregunta-card-texto'>{p.contenido}</p>
                            {p.respuesta ? (
                                <div className='pregunta-card-respuesta'>
                                    <p className='nunito-btn-font respuesta-label'>Respuesta de Tea-MO</p>
                                    <p className='lora-font'>{p.respuesta}</p>
                                </div>
                            ) : (
                                <p className='nunito-btn-font pregunta-pendiente'>Pendiente de respuesta</p>
                            )}
                        </article>
                    ))}
                </div>
                {siguienteUrl && (
                    <button
                        className='nunito-btn-font cargar-mas-btn'
                        onClick={cargarMasPreguntas}
                        disabled={cargandoMas}
                    >
                        {cargandoMas ? 'Cargando...' : 'Cargar más preguntas'}
                    </button>
                )}
            </section>

            <section className='faq-container'>
                <h2 className='nunito-font seccion-title'>Preguntas frecuentes</h2>
                <div className='faq-lista'>
                    {faqs.map((f, index) => (
                        <div className='faq-item' key={index}>
                            <button
                                className='nunito-btn-font faq-pregunta'
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaq === index}
                            >
                                {f.pregunta}
                                <span className='faq-icono'>{openFaq === index ? '−' : '+'}</span>
                            </button>
                            {openFaq === index && (
                                <p className='lora-font faq-respuesta'>{f.respuesta}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}