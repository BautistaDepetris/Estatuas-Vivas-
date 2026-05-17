import Link from 'next/link'
import { Lugar } from '@/types'
import FramedPainting from './FramedPainting'

interface LugarRowProps {
  lugar: Lugar & { estatuaNombre?: string }
  index: number
  href?: string
  last?: boolean
}

const tones = ['sepia', 'ember', 'sky', 'pastoral'] as const

export default function LugarRow({ lugar, index, href = '/lugares', last = false }: LugarRowProps) {
  const content = (
    <div
      style={{
        alignItems: 'flex-start',
        borderBottom: last ? 'none' : '0.5px solid var(--border)',
        display: 'flex',
        gap: '14px',
        padding: '16px 0',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <FramedPainting
          alt={lugar.nombre}
          width={62}
          height={62}
          tone={tones[index % tones.length]}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="editorial-lbl" style={{ fontSize: '7px', letterSpacing: '0.25em', marginBottom: '4px' }}>
          {lugar.categoria}
        </p>
        <h3 style={{ color: 'var(--ink)', fontSize: '16px', lineHeight: 1.1, marginBottom: '4px' }}>
          {lugar.nombre}
        </h3>
        <p style={{ color: 'var(--ink-3)', fontSize: '10px', lineHeight: 1.5 }}>
          {lugar.descripcion}
        </p>
      </div>
      <span style={{ color: 'var(--red)', fontSize: '14px', marginTop: '4px' }}>→</span>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
