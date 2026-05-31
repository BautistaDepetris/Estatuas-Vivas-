import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Estatua } from '@/types'
import FramedPainting from './FramedPainting'

interface NextStatuaButtonProps {
  siguiente: Estatua
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

export default function NextStatuaButton({ siguiente }: NextStatuaButtonProps) {
  const imagen = siguiente.imagenes[0]

  return (
    <Link href={`/estatuas/${siguiente.slug}`}>
      <section>
        <div>
          <FramedPainting
            src={imagen?.url}
            alt={imagen?.titulo ?? siguiente.nombre}
            height="100%"
            tone="ember"
            fill
          />
        </div>
        <div />
        <div>
          <p>Continua el recorrido</p>
          <div>
            <h2>{siguiente.nombre}</h2>
          </div>
          <p>Siguiente punto del recorrido</p>
          <span style={ctaStyle}>
            Ver mas <span aria-hidden="true">-&gt;</span>
          </span>
        </div>
      </section>
    </Link>
  )
}
