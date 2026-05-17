import Link from 'next/link'
import { Estatua } from '@/types'
import Butterfly from './Butterfly'
import HeroLivingVideo from './HeroLivingVideo'

interface HeroSectionProps {
  estatua: Estatua
}

export default function HeroSection({ estatua }: HeroSectionProps) {
  const imagen = estatua.imagenes[0]
  const partesSubtitulo = estatua.subtitulo.split('·').map((parte) => parte.trim())
  const kicker = partesSubtitulo[0] || estatua.subtitulo
  const detalle = partesSubtitulo.slice(1).join(' · ')
  const videoSrc = `/videos/${estatua.slug}.mp4`

  return (
    <section style={{ height: '100vh', minHeight: '680px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <HeroLivingVideo
          src={videoSrc}
          fallbackSrc={imagen?.url}
          fallbackAlt={imagen?.titulo ?? estatua.nombre}
        />
      </div>
      <div
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(245,237,216,0.48) 52%, var(--bg) 94%)',
          inset: 0,
          pointerEvents: 'none',
          position: 'absolute',
        }}
      />
      <Link
        aria-label="Volver al inicio"
        href="/"
        style={{
          alignItems: 'center',
          backdropFilter: 'blur(8px)',
          background: 'rgba(245,237,216,0.85)',
          border: '0.5px solid var(--border)',
          color: 'var(--brown)',
          display: 'inline-flex',
          height: '36px',
          justifyContent: 'center',
          position: 'absolute',
          right: '22px',
          top: '50px',
          width: '36px',
          zIndex: 5,
        }}
      >
        ×
      </Link>
      <Link
        href="/"
        style={{
          alignItems: 'center',
          background: 'rgba(245,237,216,0.9)',
          border: '0.5px solid var(--red)',
          color: 'var(--red)',
          display: 'inline-flex',
          fontSize: '10px',
          fontWeight: 500,
          gap: '8px',
          left: '26px',
          letterSpacing: '0.16em',
          padding: '10px 14px',
          position: 'absolute',
          textTransform: 'uppercase',
          top: '50px',
          zIndex: 5,
        }}
      >
        ← Volver al inicio
      </Link>
      <div style={{ bottom: '32px', left: '26px', position: 'absolute', right: '26px', zIndex: 5 }}>
        <p className="editorial-lbl" style={{ marginBottom: '14px' }}>
          {kicker}
        </p>
        <h1 style={{ color: 'var(--red)', fontSize: '64px', lineHeight: 0.9 }}>
          {estatua.nombre.split(' ').map((part) => (
            <span key={part}>
              {part}
              <br />
            </span>
          ))}
        </h1>
        <p
          style={{
            color: 'var(--brown)',
            fontSize: '10px',
            letterSpacing: '0.18em',
            marginTop: '16px',
            textTransform: 'uppercase',
          }}
        >
          {detalle || estatua.nombre}
        </p>
      </div>
      <Butterfly color="var(--red)" size={18} style={{ left: '28px', position: 'absolute', top: '130px', zIndex: 4 }} />
    </section>
  )
}
