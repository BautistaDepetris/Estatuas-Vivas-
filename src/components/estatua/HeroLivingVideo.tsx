'use client'

import { useRef, useState } from 'react'
import FramedPainting from './FramedPainting'

interface HeroLivingVideoProps {
  src: string
  fallbackSrc?: string | null
  fallbackAlt: string
}

export default function HeroLivingVideo({ src, fallbackSrc, fallbackAlt }: HeroLivingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const loopStartRef = useRef<number | null>(null)
  const [videoOk, setVideoOk] = useState(true)
  const [visible, setVisible] = useState(true)
  const [looping, setLooping] = useState(false)

  const prepararLoop = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    loopStartRef.current = Math.max(video.duration - 2, 0)
  }

  const revisarTiempo = () => {
    const video = videoRef.current
    const loopStart = loopStartRef.current
    if (!video || loopStart === null || looping || video.currentTime < loopStart) return

    setLooping(true)
    setVisible(false)

    window.setTimeout(() => {
      video.currentTime = loopStart
      video.play().catch(() => undefined)
      setVisible(true)
      window.setTimeout(() => setLooping(false), 500)
    }, 500)
  }

  if (!videoOk) {
    return (
      <FramedPainting
        src={fallbackSrc}
        alt={fallbackAlt}
        height="100%"
        tone="portrait"
        fill
        priority
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={prepararLoop}
      onTimeUpdate={revisarTiempo}
      onError={() => setVideoOk(false)}
      style={{
        height: '100%',
        left: 0,
        objectFit: 'cover',
        opacity: visible ? 1 : 0.82,
        position: 'absolute',
        top: 0,
        transition: 'opacity 0.5s ease',
        width: '100%',
      }}
    />
  )
}
