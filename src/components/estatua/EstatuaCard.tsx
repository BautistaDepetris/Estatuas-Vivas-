import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Estatua } from '@/types'
import FramedPainting from './FramedPainting'

interface EstatuaCardProps {
  estatua: Estatua
  tone?: 'portrait' | 'ember'
}

const ctaStyle: CSSProperties = {
  color: '#3A0F0E',
  display: 'inline-flex',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  fontSize: '10px',
  fontWeight: 500,
  gap: '10px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
}

export default function EstatuaCard({
  estatua,
  tone = 'portrait',
}: EstatuaCardProps) {
  const imagen = estatua.imagenes[0]
  const kicker = estatua.subtitulo.split('Â·')[0]?.trim() || estatua.subtitulo
  const descripcion =
    estatua.slug === 'cura-brochero'
      ? 'Recorrio las sierras cordobesas a mula, llevando fe y escuela a los mas olvidados de la tierra.'
      : estatua.capitulos[0]?.texto ?? estatua.frase

  return (
    <Link href={`/estatuas/${estatua.slug}`}>
      <article>
        <FramedPainting
          src={imagen?.url}
          alt={imagen?.titulo ?? estatua.nombre}
          height={240}
          tone={tone}
          label={`${estatua.nombre} - archivo`}
        />
        <div>
          <p>{kicker}</p>
          <h3>{estatua.nombre}</h3>
          <p>{descripcion}</p>
          <span style={ctaStyle}>
            Ver mas <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
