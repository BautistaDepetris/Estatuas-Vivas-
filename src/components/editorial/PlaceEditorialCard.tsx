import OrnamentalFrame from './OrnamentalFrame'

interface PlaceEditorialCardProps {
  categoria?: string | null
  descripcion?: string | null
  imageUrl?: string | null
  index: number
  nombre: string
}

export default function PlaceEditorialCard({ categoria, descripcion, imageUrl, index, nombre }: PlaceEditorialCardProps) {
  return (
    <article
      style={{
        borderTop: '1px solid rgba(201,168,76,0.32)',
        color: '#F5EDD8',
        display: 'grid',
        gap: '18px',
        gridTemplateColumns: '52px minmax(0, 1fr)',
        padding: '24px 0',
      }}
    >
      <span style={{ color: '#C9A84C', fontFamily: 'var(--font-display)', fontSize: '32px', fontStyle: 'italic', lineHeight: 1 }}>
        /{String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <div style={{ marginBottom: '18px' }}>
          <OrnamentalFrame
            alt={nombre}
            aspectRatio="16 / 8.6"
            className="ornamental-frame--compact"
            src={imageUrl}
            variant="horizontal"
          />
        </div>
        {categoria && (
          <p style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.18em', marginBottom: '8px', textTransform: 'uppercase' }}>
            {categoria}
          </p>
        )}
        <h3 style={{ color: '#F5EDD8', fontFamily: 'var(--font-display)', fontSize: '30px', fontStyle: 'italic', lineHeight: 1, overflowWrap: 'anywhere' }}>
          {nombre}
        </h3>
        {descripcion && (
          <p style={{ color: '#CBB995', fontSize: '13px', lineHeight: 1.55, marginTop: '10px', overflowWrap: 'anywhere' }}>{descripcion}</p>
        )}
      </div>
    </article>
  )
}
