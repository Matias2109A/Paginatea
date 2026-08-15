import { useState } from 'react'
import './Eventos.css'

//(backend): estos son eventos de ejemplo, dejar vacío en producción.
const eventosIniciales = []

export default function Eventos() {
    const [eventos, setEventos] = useState(eventosIniciales)
    const [form, setForm] = useState({ titulo: '', fecha: '', hora: '', ubicacion: '', descripcion: '' })
    const [enviando, setEnviando] = useState(false)

    //(backend): traer los eventos reales al cargar la página.
   
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.titulo.trim() || !form.fecha || !form.hora || !form.ubicacion.trim()) return

        setEnviando(true)

        //(backend): reemplazar este bloque por el POST real, algo como:
        // const res = await fetch('/api/eventos', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(form),
        // })
        // const nuevoEvento = await res.json()
        // setEventos([nuevoEvento, ...eventos])

        // --- Simulación temporal mientras no hay backend conectado ---
        const nuevoEvento = { id: Date.now(), ...form }
        setEventos([nuevoEvento, ...eventos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)))
        // --- fin simulación ---

        setForm({ titulo: '', fecha: '', hora: '', ubicacion: '', descripcion: '' })
        setEnviando(false)
    }

    function handleDelete(id) {
        //(backend): reemplazar por el DELETE real, algo como:

        setEventos(eventos.filter((ev) => ev.id !== id))
    }

    function formatearFecha(fechaStr) {
        const fecha = new Date(fechaStr + 'T00:00:00')
        return fecha.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
    }

    return (
        <main>
            <section className='eventos-container'>
                <span className='eventos-icon'>📌</span>
                <h1 className='nunito-font eventos-title'>Eventos</h1>
                <p className='nunito-font eventos-desc'>
                    Enterate de nuestras próximas juntadas, charlas y actividades.
                </p>

                {/*(backend): este formulario hoy es visible para cualquiera.
                   Cuando haya login de admin, mostrar este bloque solo si esAdmin === true. */}
                <form className='nunito-font evento-form' onSubmit={handleSubmit}>
                    <p className='nunito-btn-font evento-form-label'>Publicar nuevo evento</p>
                    <input
                        className='nunito-font evento-input'
                        type="text"
                        name="titulo"
                        placeholder="Título del evento"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                    />
                    <div className='evento-input-row'>
                        <input
                            className='nunito-font evento-input'
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='nunito-font evento-input'
                            type="time"
                            name="hora"
                            value={form.hora}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <input
                        className='nunito-font evento-input'
                        type="text"
                        name="ubicacion"
                        placeholder="Ubicación"
                        value={form.ubicacion}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        className='nunito-font evento-textarea'
                        name="descripcion"
                        placeholder="Descripción (opcional)"
                        rows={2}
                        value={form.descripcion}
                        onChange={handleChange}
                    />
                    <button className='nunito-btn-font evento-btn' type="submit" disabled={enviando}>
                        {enviando ? 'Publicando...' : 'Publicar evento'}
                    </button>
                </form>
            </section>

            <section className='pizarron-container'>
                <h2 className='nunito-font seccion-title'>Próximas actividades</h2>

                {eventos.length === 0 ? (
                    <p className='nunito-font sin-eventos'>Todavía no hay eventos cargados.</p>
                ) : (
                    <div className='pizarron'>
                        {eventos.map((ev) => (
                            <article className='nunito-font evento-card' key={ev.id}>
                                <div className='evento-card-header'>
                                    <span className='evento-fecha'>{formatearFecha(ev.fecha)}</span>
                                    {/*(backend): botón de borrar, restringir a admin cuando exista login. */}
                                    <button
                                        className='evento-borrar'
                                        onClick={() => handleDelete(ev.id)}
                                        aria-label={`Borrar evento ${ev.titulo}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <h3 className='nunito-font evento-titulo'>{ev.titulo}</h3>
                                <div className='nunito-font evento-info'>
                                    <span className='evento-info-item'>🕒 {ev.hora} hs</span>
                                    <span className='evento-info-item'>📍 {ev.ubicacion}</span>
                                </div>
                                {ev.descripcion && (
                                    <p className='nunito-font evento-descripcion'>{ev.descripcion}</p>
                                )}
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
