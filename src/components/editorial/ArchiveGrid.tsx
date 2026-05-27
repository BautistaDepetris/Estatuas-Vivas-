interface ArchiveGridItem {
  categoria?: string | null
  descripcion?: string | null
  id?: string
  titulo: string
  url?: string | null
}

interface ArchiveGridProps {
  items: ArchiveGridItem[]
}

export default function ArchiveGrid({ items }: ArchiveGridProps) {
  if (!items.length) return null

  return (
    <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
      {items.map((item, index) => (
        <article key={item.id ?? `${item.url}-${index}`} style={{ color: '#F5EDD8' }}>
          <div
            style={{
              aspectRatio: index % 3 === 0 ? '1 / 1.18' : '1 / 0.88',
              background: '#1C1008',
              border: '3px solid #C9A84C',
              boxShadow: '0 14px 32px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(255,235,165,0.42)',
              overflow: 'hidden',
            }}
          >
            {item.url ? (
              <img
                src={item.url}
                alt={item.titulo}
                style={{
                  filter: 'sepia(0.24) saturate(0.82) contrast(1.04)',
                  height: '100%',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            ) : null}
          </div>
          <div style={{ paddingTop: '12px' }}>
            {item.categoria && (
              <p style={{ color: '#C9A84C', fontSize: '8px', letterSpacing: '0.22em', marginBottom: '6px', textTransform: 'uppercase' }}>
                {item.categoria}
              </p>
            )}
            <h3 style={{ color: '#F5EDD8', fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic', lineHeight: 1.06 }}>
              {item.titulo}
            </h3>
            {item.descripcion && (
              <p style={{ color: '#BCA987', fontSize: '11px', lineHeight: 1.45, marginTop: '6px' }}>{item.descripcion}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
