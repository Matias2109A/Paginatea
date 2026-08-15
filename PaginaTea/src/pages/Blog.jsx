import { useState } from 'react'
import './Blog.css'
//(backend): este array es de ejemplo. Reemplazar por las preguntas que devuelva la API.
const preguntasIniciales = []

// Estas preguntas frecuentes son fijas
// (backend): si más adelante quieren editarlas desde un panel admin, este array
// también podría venir de la API.
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
    const [preguntas, setPreguntas] = useState(preguntasIniciales)
    const [form, setForm] = useState({ nombre: '', pregunta: '' })
    const [enviando, setEnviando] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)
    //(backend): traer las preguntas reales al cargar la página.

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.nombre.trim() || !form.pregunta.trim()) return

        setEnviando(true)
        //(backend): reemplazar este bloque por el POST real
        const nuevaPregunta = {
            id: Date.now(),
            nombre: form.nombre,
            pregunta: form.pregunta,
            respuesta: null,
        }
        setPreguntas([nuevaPregunta, ...preguntas])

        setForm({ nombre: '', pregunta: '' })
        setEnviando(false)
    }

    function toggleFaq(index) {
        setOpenFaq(openFaq === index ? null : index)
    }

    function handleDelete(id) {
        //(backend): reemplazar por el DELETE real
        setPreguntas(preguntas.filter((p) => p.id !== id))
    }

    return (
        <main>
            <section className='blog-container'>
                <span className='blog-icon'>✍️</span>
                <h1 className='nunito-font blog-title'>Preguntas y respuestas</h1>
                <p className='lora-font blog-desc'>
                    ¿Tenés una duda sobre neurodivergencia o autismo? Dejanos tu pregunta y te respondemos por acá.
                </p>

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
                <div className='preguntas-lista'>
                    {preguntas.length === 0 && (
                        <p className='lora-font sin-preguntas'>Todavía no hay preguntas. ¡Sé el primero en escribir!</p>
                    )}
                    {preguntas.map((p) => (
                        <article className='pregunta-card' key={p.id}>
                            <div className='pregunta-card-header'>
                                <p className='nunito-font pregunta-card-nombre'>{p.nombre}</p>
                                 {/*(backend): este botón de borrar hoy es visible para cualquiera.
                                   Si más adelante hay login de admin, mostrar solo si esAdmin === true. */}
                                <button
                                    className='pregunta-borrar'
                                    onClick={() => handleDelete(p.id)}
                                    aria-label={`Borrar pregunta de ${p.nombre}`}
                                >
                                    ✕
                                </button>
                            </div>       
                            <p className='lora-font pregunta-card-texto'>{p.pregunta}</p>
                            {p.respuesta ? (
                                <div className='pregunta-card-respuesta'>
                                    <p className='nunito-btn-font respuesta-label'>Respuesta de Tea-MO</p>
                                    <p className='lora-font'>{p.respuesta}</p>
                                </div>
                            ) : (
                                <p className='nunito-btn-font pregunta-pendiente'>Pendiente de respuesta</p>
                                //(backend): futuro un botón "Responder" visible
                            )}
                        </article>
                    ))}
                </div>
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