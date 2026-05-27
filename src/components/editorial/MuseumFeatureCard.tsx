import Link from 'next/link'
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

const cardStyle = {
  background: '#F5EDD8',
  border: '1px solid rgba(201,168,76,0.58)',
  boxShadow: '0 18px 46px rgba(0,0,0,0.52)',
  color: '#1C1008',
  maxWidth: '100%',
  overflow: 'hidden',
  width: '100%',
} as const

const copyStyle = {
  backgroundColor: '#F5EDD8',
  backgroundImage: 'linear-gradient(rgba(245,237,216,0.84), rgba(245,237,216,0.84)), url("/assets/Lienzo%20de%20fondo.png")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  padding: '22px 26px 24px',
} as const

const labelStyle = {
  color: '#8B1A1A',
  fontSize: '11px',
  letterSpacing: '0.15em',
  marginBottom: '10px',
  textTransform: 'uppercase',
} as const

const titleStyle = {
  color: '#1C1008',
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(30px, 8vw, 50px)',
  fontStyle: 'italic',
  lineHeight: 0.98,
  overflowWrap: 'anywhere',
} as const

const descriptionStyle = {
  color: '#3D2B1F',
  fontSize: '14px',
  lineHeight: 1.46,
  marginTop: '12px',
  maxWidth: '620px',
  overflowWrap: 'anywhere',
} as const

const actionStyle = {
  alignItems: 'center',
  background: '#8B1A1A',
  color: '#F5EDD8',
  display: 'flex',
  fontSize: '12px',
  justifyContent: 'space-between',
  letterSpacing: '0.28em',
  padding: '17px 26px',
  textTransform: 'uppercase',
} as const

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
    <article style={cardStyle}>
      <OrnamentalFrame alt={titulo} aspectRatio="16 / 10.2" src={imageUrl} variant={frameVariant} />
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
