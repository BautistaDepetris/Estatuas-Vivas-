'use client'

interface AudioTrackCardProps {
  titulo: string
  descripcion: string
  index: number
}

export default function AudioTrackCard({ titulo, descripcion, index }: AudioTrackCardProps) {
  return (
    <article
      style={{
        alignItems: 'center',
        background: 'var(--bg-2)',
        border: '0.5px solid var(--border)',
        display: 'flex',
        gap: '14px',
        padding: '16px',
      }}
    >
      <button
        aria-label={`Reproducir ${titulo}`}
        disabled
        style={{
          alignItems: 'center',
          background: 'var(--red)',
          border: 0,
          borderRadius: '50%',
          color: 'var(--paper)',
          display: 'flex',
          flexShrink: 0,
          height: '38px',
          justifyContent: 'center',
          opacity: 0.75,
          width: '38px',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="editorial-lbl" style={{ color: 'var(--red)', fontSize: '8px', marginBottom: '6px' }}>
          Audio /{String(index + 1).padStart(2, '0')}
        </p>
        <h3 style={{ fontSize: '17px', lineHeight: 1.1, marginBottom: '6px' }}>{titulo}</h3>
        <p style={{ color: 'var(--ink-3)', fontSize: '10px', lineHeight: 1.55 }}>{descripcion}</p>
        <div style={{ background: 'var(--border)', height: '1px', marginTop: '12px', position: 'relative' }}>
          <span style={{ background: 'var(--red)', display: 'block', height: '1px', width: `${24 + index * 12}%` }} />
        </div>
      </div>
    </article>
  )
}
