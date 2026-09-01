import { useState, useEffect } from 'react'
import './Eventos.css'

// URL de la API de Django, cambiar por la URL real del backend.
const API_URL = 'http://127.0.0.1:8000/api/eventos/'
const SUSCRIBIRSE_URL = 'http://127.0.0.1:8000/api/eventos/suscribirse/'

export default function Eventos() {
    const [eventos, setEventos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [cargandoMas, setCargandoMas] = useState(false)
    const [siguienteUrl, setSiguienteUrl] = useState(null)
    const [error, setError] = useState(null)

    const [email, setEmail] = useState('')
    const [suscribiendo, setSuscribiendo] = useState(false)
    const [suscripto, setSuscripto] = useState(false)
    const [errorSuscripcion, setErrorSuscripcion] = useState(null)

    useEffect(() => {
        cargarEventos()
    }, [])

    async function cargarEventos() {
        try {
            setCargando(true)
            const res = await fetch(API_URL)
            if (!res.ok) throw new Error('No se pudieron cargar los eventos')
            const data = await res.json()
            setEventos(data.results)
            setSiguienteUrl(data.next)
            setError(null)
        } catch (err) {
            setError('No pudimos cargar los próximos eventos. Intentá de nuevo más tarde.')
        } finally {
            setCargando(false)
        }
    }

    async function cargarMasEventos() {
        if (!siguienteUrl) return
        try {
            setCargandoMas(true)
            const res = await fetch(siguienteUrl)
            if (!res.ok) throw new Error('No se pudieron cargar más eventos')
            const data = await res.json()
            setEventos((prev) => [...prev, ...data.results])
            setSiguienteUrl(data.next)
        } catch (err) {
            setError('No pudimos cargar más eventos. Intentá de nuevo más tarde.')
        } finally {
            setCargandoMas(false)
        }
    }

    function formatearFecha(fechaStr) {
        const fecha = new Date(fechaStr + 'T00:00:00')
        return fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    }

    function formatearHora(horaStr) {
        return horaStr?.slice(0, 5)
    }

    async function handleSuscribirse(e) {
        e.preventDefault()
        if (!email.trim()) return

        setSuscribiendo(true)
        setErrorSuscripcion(null)
        try {
            const res = await fetch(SUSCRIBIRSE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) {
                if (res.status === 429) {
                    throw new Error('Demasiados intentos seguidos. Esperá un poco y volvé a intentar.')
                }
                const primerError = Object.values(data)[0]?.[0]
                throw new Error(primerError || 'No pudimos activar la notificación. Intentá de nuevo.')
            }
            setSuscripto(true)
        } catch (err) {
            setErrorSuscripcion(err.message)
        } finally {
            setSuscribiendo(false)
        }
    }

    return (
        <main className='eventos-main'>
            <section className='eventos-container'>
                <span className='eventos-icon'>📌</span>
                <h1 className='nunito-font eventos-title'>Eventos</h1>
                <p className='nunito-font eventos-desc'>
                    Enterate de nuestras próximas juntadas, charlas y actividades.
                </p>

                {suscripto ? (
                    <p className='nunito-font suscripcion-confirmada'>
                        ✔️ ¡Listo! Te vamos a avisar por email cada vez que subamos un evento nuevo.
                    </p>
                ) : (
                    <form className='suscripcion-form' onSubmit={handleSuscribirse}>
                        <input
                            className='nunito-font suscripcion-input'
                            type="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button className='nunito-btn-font suscripcion-btn' type="submit" disabled={suscribiendo}>
                            {suscribiendo ? 'Activando...' : 'Activar notificaciones'}
                        </button>
                    </form>
                )}
                {errorSuscripcion && (
                    <p className='nunito-font suscripcion-error'>{errorSuscripcion}</p>
                )}
            </section>

            <section className='pizarron-container'>
                <h2 className='nunito-font seccion-title'>Próximas actividades</h2>

                {error && (
                    <div className='eventos-error' role="alert">
                        <svg className='eventos-error-icon' viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                            <path d="M12 7.5V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            <circle cx="12" cy="16.2" r="1" fill="currentColor" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {cargando && (
                    <p className='nunito-font sin-eventos'>Cargando eventos...</p>
                )}

                {!cargando && !error && eventos.length === 0 && (
                    <p className='nunito-font sin-eventos'>
                        Por ahora no hay eventos programados. ¡Volvé a visitarnos pronto!
                    </p>
                )}

                {!cargando && eventos.length > 0 && (
                    <div className='pizarron'>
                        {eventos.map((ev, index) => (
                            <article
                                className={`nunito-font evento-card ${index === 0 ? 'evento-card-destacado' : ''}`}
                                key={ev.id}
                            >
                                <div className='evento-card-header'>
                                    <span className='evento-fecha'>{formatearFecha(ev.fecha)}</span>
                                    {index === 0 && (
                                        <span className='evento-badge-proximo'>Próximo evento</span>
                                    )}
                                </div>
                                <h3 className='nunito-font evento-titulo'>{ev.titulo}</h3>
                                <div className='nunito-font evento-info'>
                                    <span className='evento-info-item'>🕒 {formatearHora(ev.hora)} hs</span>
                                    <span className='evento-info-item'>📍 {ev.ubicacion}</span>
                                </div>
                                {ev.descripcion && (
                                    <p className='nunito-font evento-descripcion'>{ev.descripcion}</p>
                                )}
                            </article>
                        ))}
                    </div>
                )}

                {siguienteUrl && (
                    <button
                        className='nunito-btn-font cargar-mas-btn'
                        onClick={cargarMasEventos}
                        disabled={cargandoMas}
                    >
                        {cargandoMas ? 'Cargando...' : 'Cargar más eventos'}
                    </button>
                )}
            </section>
        </main>
    )
}
