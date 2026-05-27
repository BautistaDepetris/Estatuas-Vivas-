import Link from 'next/link'

interface MuseumFeatureCardProps {
  actionHref?: string
  actionLabel?: string
  categoria?: string | null
  descripcion?: string | null
  imageUrl?: string | null
  titulo: string
}

const cardStyle = {
  background: '#F5EDD8',
  border: '6px solid #1C1008',
  boxShadow: '0 18px 46px rgba(0,0,0,0.52)',
  color: '#1C1008',
  overflow: 'hidden',
} as const

const imageWrapStyle = {
  background: '#1C1008',
  borderBottom: '6px solid #1C1008',
  height: 'clamp(210px, 58vw, 430px)',
  position: 'relative',
} as const

const imageStyle = {
  filter: 'sepia(0.24) saturate(0.84) contrast(1.06) brightness(0.92)',
  height: '100%',
  objectFit: 'cover',
  width: '100%',
} as const

const frameStyle = {
  border: '10px solid #C9A84C',
  boxShadow: 'inset 0 0 0 2px rgba(47,25,5,0.82), inset 0 0 28px rgba(0,0,0,0.52)',
  inset: '10px',
  outline: '1px solid rgba(248,226,151,0.74)',
  outlineOffset: '-6px',
  pointerEvents: 'none',
  position: 'absolute',
} as const

const copyStyle = {
  backgroundColor: '#F5EDD8',
  backgroundImage: 'linear-gradient(rgba(245,237,216,0.84), rgba(245,237,216,0.84)), url("/assets/textura-papel.png.png")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  padding: '24px 28px 26px',
} as const

const labelStyle = {
  color: '#8B1A1A',
  fontSize: '11px',
  letterSpacing: '0.15em',
  marginBottom: '12px',
  textTransform: 'uppercase',
} as const

const titleStyle = {
  color: '#1C1008',
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(32px, 9vw, 54px)',
  fontStyle: 'italic',
  lineHeight: 0.98,
} as const

const descriptionStyle = {
  color: '#3D2B1F',
  fontSize: '15px',
  lineHeight: 1.48,
  marginTop: '14px',
  maxWidth: '620px',
} as const

const actionStyle = {
  alignItems: 'center',
  background: '#8B1A1A',
  color: '#F5EDD8',
  display: 'flex',
  fontSize: '12px',
  justifyContent: 'space-between',
  letterSpacing: '0.28em',
  padding: '18px 28px',
  textTransform: 'uppercase',
} as const

export default function MuseumFeatureCard({
  actionHref,
  actionLabel = 'Ver mas',
  categoria,
  descripcion,
  imageUrl,
  titulo,
}: MuseumFeatureCardProps) {
  return (
    <article style={cardStyle}>
      <div style={imageWrapStyle}>
        {imageUrl ? (
          <img src={imageUrl} alt={titulo} style={imageStyle} />
        ) : (
          <div style={{ background: '#1C1008', height: '100%', width: '100%' }} />
        )}
        <div style={frameStyle} />
      </div>
      <div style={copyStyle}>
        {categoria && <p style={labelStyle}>{categoria}</p>}
        <h3 style={titleStyle}>{titulo}</h3>
        {descripcion && <p style={descriptionStyle}>{descripcion}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} style={actionStyle}>
          <span>{actionLabel}</span>
          <span aria-hidden="true" style={{ fontSize: '22px', letterSpacing: 0 }}>
            -&gt;
          </span>
        </Link>
      )}
    </article>
  )
}
