'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  audioUrl: string | null
  nombreEstatua: string
}

export default function AudioPlayer({
  audioUrl,
  nombreEstatua,
}: AudioPlayerProps) {
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
      return
    }

    audioRef.current.play()
    setReproduciendo(true)
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
    <div>
      <div>
        <span>
          {sinAudio ? 'Audio proximamente' : `${nombreEstatua} - Historia narrada`}
        </span>
        {!sinAudio && (
          <span>
            {formatearTiempo(tiempoActual)} / {formatearTiempo(duracion)}
          </span>
        )}
      </div>
      {!sinAudio && (
        <>
          <div onClick={moverProgreso}>Progreso: {Math.round(progreso)}%</div>
          <button
            aria-label={reproduciendo ? 'Pausar audio' : 'Reproducir audio'}
            disabled={cargando}
            onClick={toggleReproducir}
          >
            {reproduciendo ? 'Pausar' : 'Reproducir'}
          </button>
        </>
      )}
    </div>
  )
}
