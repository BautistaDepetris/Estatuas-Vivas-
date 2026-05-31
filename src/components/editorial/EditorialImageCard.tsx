import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

interface EditorialImageCardProps {
  alt: string
  ctaLabel?: string
  descripcion?: string | null
  href?: string
  imageHeight?: number
  imageUrl?: string | null
  kicker?: string | null
  titulo: string
}

const frameStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #d9bf8a 0%, #b89c64 60%, #8c6b42 100%)',
  border: '0.5px solid #6b4c2a',
  boxShadow:
    '0 1px 2px rgba(60,40,20,0.25), inset 0 0 0 1px rgba(255,240,200,0.35)',
  boxSizing: 'border-box',
  padding: '5px',
}

const imageStyle: CSSProperties = {
  display: 'block',
  objectFit: 'cover',
  overflow: 'hidden',
  width: '100%',
}

const placeholderStyle: CSSProperties = {
  background:
    'radial-gradient(ellipse at 40% 30%, #b89572 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d2a14 0%, transparent 60%), linear-gradient(160deg, #7a5a3e 0%, #3d2a14 100%)',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
}

const bodyStyle: CSSProperties = {
  paddingTop: '16px',
}

const kickerStyle: CSSProperties = {
  color: '#3A0F0E',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '9px',
  fontWeight: 500,
  letterSpacing: '0.28em',
  lineHeight: 1.4,
  margin: '0 0 10px',
  textTransform: 'uppercase',
}

const titleStyle: CSSProperties = {
  color: '#3A0F0E',
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '26px',
  fontStyle: 'italic',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  lineHeight: 1,
  margin: '0 0 10px',
}

const descriptionStyle: CSSProperties = {
  color: '#3A0F0E',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '11px',
  lineHeight: 1.75,
  margin: 0,
}

const ctaStyle: CSSProperties = {
  alignItems: 'center',
  color: '#3A0F0E',
  display: 'inline-flex',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '10px',
  fontWeight: 500,
  gap: '10px',
  letterSpacing: '0.22em',
  marginTop: '14px',
  textTransform: 'uppercase',
}

function CardContent({
  alt,
  ctaLabel,
  descripcion,
  imageHeight = 200,
  imageUrl,
  kicker,
  titulo,
}: EditorialImageCardProps) {
  return (
    <article>
      <div style={frameStyle}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            style={{ ...imageStyle, height: imageHeight }}
          />
        ) : (
          <div
            aria-label={alt}
            role="img"
            style={{ ...placeholderStyle, height: imageHeight }}
          />
        )}
      </div>
      <div style={bodyStyle}>
        {kicker && <div style={kickerStyle}>{kicker}</div>}
        <h3 style={titleStyle}>{titulo}</h3>
        {descripcion && <p style={descriptionStyle}>{descripcion}</p>}
        {ctaLabel && (
          <div style={ctaStyle}>
            {ctaLabel} <span style={{ fontSize: '14px' }}>-&gt;</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default function EditorialImageCard(props: EditorialImageCardProps) {
  const content: ReactNode = <CardContent {...props} />

  if (!props.href) {
    return content
  }

  return <Link href={props.href}>{content}</Link>
}
