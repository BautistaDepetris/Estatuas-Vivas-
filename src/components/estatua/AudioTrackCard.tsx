'use client'

interface AudioTrackCardProps {
  titulo: string
  descripcion: string
  index: number
}

export default function AudioTrackCard({
  titulo,
  descripcion,
  index,
}: AudioTrackCardProps) {
  return (
    <article>
      <button aria-label={`Reproducir ${titulo}`} disabled>
        Reproducir
      </button>
      <div>
        <p>Audio /{String(index + 1).padStart(2, '0')}</p>
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </article>
  )
}
