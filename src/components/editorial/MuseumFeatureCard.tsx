import Link from 'next/link'
import type { CSSProperties } from 'react'
import OrnamentalFrame from './OrnamentalFrame'

interface MuseumFeatureCardProps {
  actionHref?: string
  actionLabel?: string
  categoria?: string | null
  descripcion?: string | null
  frameVariant?: 'full' | 'sides' | 'horizontal'
  imageUrl?: string | null
  titulo: string
}

const fontDisplay = "'Playfair Display', Georgia, serif"
const fontBody = "'Inter', system-ui, -apple-system, sans-serif"

const labelStyle: CSSProperties = {
  color: '#6B4C2A',
  fontFamily: fontBody,
  fontSize: '9px',
  fontWeight: 500,
  letterSpacing: '0.28em',
  lineHeight: 1.4,
  textTransform: 'uppercase',
}

const titleStyle: CSSProperties = {
  color: '#3D2A14',
  fontFamily: fontDisplay,
  fontSize: 'clamp(26px, 6vw, 38px)',
  fontStyle: 'italic',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  lineHeight: 1,
}

const bodyStyle: CSSProperties = {
  color: '#6B4C2A',
  fontFamily: fontBody,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 1.7,
}

const actionStyle: CSSProperties = {
  color: '#8B2020',
  fontFamily: fontBody,
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
}

export default function MuseumFeatureCard({
  actionHref,
  actionLabel = 'Ver mas',
  categoria,
  descripcion,
  frameVariant = 'full',
  imageUrl,
  titulo,
}: MuseumFeatureCardProps) {
  return (
    <article>
      <OrnamentalFrame alt={titulo} src={imageUrl} variant={frameVariant} />
      <div>
        {categoria && <p style={labelStyle}>{categoria}</p>}
        <h3 style={titleStyle}>{titulo}</h3>
        {descripcion && <p style={bodyStyle}>{descripcion}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} style={actionStyle}>
          <span>{actionLabel}</span>
          <span aria-hidden="true">-&gt;</span>
        </Link>
      )}
    </article>
  )
}
