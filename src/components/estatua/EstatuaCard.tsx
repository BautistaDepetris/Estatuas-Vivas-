import Link from 'next/link'
import { Estatua } from '@/types'
import FramedPainting from './FramedPainting'

interface EstatuaCardProps {
  estatua: Estatua
  tone?: 'portrait' | 'ember'
}

export default function EstatuaCard({ estatua, tone = 'portrait' }: EstatuaCardProps) {
  const imagen = estatua.imagenes[0]
  const kicker = estatua.subtitulo.split('·')[0]?.trim() || estatua.subtitulo
  const descripcion =
    estatua.slug === 'cura-brochero'
      ? 'Recorrió las sierras cordobesas a mula, llevando fe y escuela a los más olvidados de la tierra.'
      : estatua.capitulos[0]?.texto ?? estatua.frase

  return (
    <Link href={`/estatuas/${estatua.slug}`} style={{ display: 'block' }}>
      <article style={{ cursor: 'pointer' }}>
        <FramedPainting
          src={imagen?.url}
          alt={imagen?.titulo ?? estatua.nombre}
          height={240}
          tone={tone}
          label={`${estatua.nombre} · archivo`}
        />
        <div style={{ paddingTop: '18px' }}>
          <p className="editorial-lbl" style={{ marginBottom: '10px' }}>
            {kicker}
          </p>
          <h3
            style={{
              color: 'var(--red)',
              fontSize: '30px',
              lineHeight: 1,
              marginBottom: '10px',
            }}
          >
            {estatua.nombre}
          </h3>
          <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.75, maxWidth: '34ch' }}>
            {descripcion}
          </p>
          <span
            style={{
              alignItems: 'center',
              color: 'var(--red)',
              display: 'inline-flex',
              fontSize: '10px',
              fontWeight: 500,
              gap: '10px',
              letterSpacing: '0.22em',
              marginTop: '16px',
              textTransform: 'uppercase',
            }}
          >
            Descubrir <span style={{ fontSize: '14px' }}>→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
