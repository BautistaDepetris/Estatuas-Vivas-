import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Lugar } from '@/types'
import FramedPainting from './FramedPainting'

interface LugarRowProps {
  lugar: Lugar & {
    estatuaNombre?: string
  }
  index: number
  href?: string
  last?: boolean
}

const tones = ['sepia', 'ember', 'sky', 'pastoral'] as const

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

export default function LugarRow({
  lugar,
  index,
  href = '/lugares',
}: LugarRowProps) {
  const content = (
    <div>
      <div>
        <FramedPainting
          src={lugar.imagen_url}
          alt={lugar.nombre}
          width={62}
          height={62}
          tone={tones[index % tones.length]}
        />
      </div>
      <div>
        <p>{lugar.categoria}</p>
        <h3>{lugar.nombre}</h3>
        <p>{lugar.descripcion}</p>
        {href && (
          <span style={ctaStyle}>
            Ver mas <span aria-hidden="true">-&gt;</span>
          </span>
        )}
      </div>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
