'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  audioUrl: string | null
  nombreEstatua: string
}

export default function AudioPlayer({ audioUrl, nombreEstatua }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [reproduciendo, setReproduciendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [tiempoActual, setTiempoActual] = useState(0)
  const [duracion, setDuracion] = useState(0)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!audioUrl) return

    const audio = new Audio(audioUrl)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => {
      setDuracion(audio.duration)
      setCargando(false)
    })
    audio.addEventListener('timeupdate', () => {
      setTiempoActual(audio.currentTime)
      setProgreso(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    })
    audio.addEventListener('ended', () => {
      setReproduciendo(false)
      setProgreso(0)
      setTiempoActual(0)
      audio.currentTime = 0
    })
    audio.addEventListener('waiting', () => setCargando(true))
    audio.addEventListener('canplay', () => setCargando(false))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [audioUrl])

  const toggleReproducir = () => {
    if (!audioRef.current || !audioUrl) return
    if (reproduciendo) {
      audioRef.current.pause()
      setReproduciendo(false)
    } else {
      audioRef.current.play()
      setReproduciendo(true)
    }
  }

  const moverProgreso = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duracion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const porcentaje = (event.clientX - rect.left) / rect.width
    audioRef.current.currentTime = porcentaje * duracion
  }

  const formatearTiempo = (segundos: number) => {
    if (Number.isNaN(segundos) || segundos === 0) return '0:00'
    const minutos = Math.floor(segundos / 60)
    const resto = Math.floor(segundos % 60)
    return `${minutos}:${resto.toString().padStart(2, '0')}`
  }

  const sinAudio = !audioUrl

  return (
    <div
      style={{
        alignItems: 'center',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--red)',
        bottom: 0,
        display: 'flex',
        gap: '14px',
        height: '64px',
        left: 0,
        padding: '0 18px',
        position: 'fixed',
        right: 0,
        zIndex: 50,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: 'var(--ink)',
            display: 'flex',
            fontSize: '9px',
            justifyContent: 'space-between',
            letterSpacing: '0.18em',
            marginBottom: '6px',
            textTransform: 'uppercase',
          }}
        >
          <span>{sinAudio ? 'Audio próximamente' : `${nombreEstatua} · Historia narrada`}</span>
          {!sinAudio && (
            <span style={{ color: 'var(--ink-4)' }}>
              {formatearTiempo(tiempoActual)} / {formatearTiempo(duracion)}
            </span>
          )}
        </div>
        <div onClick={moverProgreso} style={{ background: 'var(--border)', cursor: sinAudio ? 'default' : 'pointer', height: '1px', position: 'relative' }}>
          <div style={{ background: 'var(--red)', height: '100%', left: 0, position: 'absolute', top: 0, width: `${sinAudio ? 0 : progreso}%` }} />
        </div>
      </div>
      {!sinAudio && (
        <button
          aria-label={reproduciendo ? 'Pausar audio' : 'Reproducir audio'}
          disabled={cargando}
          onClick={toggleReproducir}
          style={{
            alignItems: 'center',
            background: 'var(--red)',
            border: 0,
            borderRadius: '50%',
            color: 'var(--paper)',
            cursor: cargando ? 'wait' : 'pointer',
            display: 'flex',
            height: '38px',
            justifyContent: 'center',
            opacity: cargando ? 0.7 : 1,
            width: '38px',
          }}
        >
          {reproduciendo ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}
