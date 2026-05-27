import OrnamentalFrame from './OrnamentalFrame'

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
    <div className="editorial-grid">
      {items.map((item, index) => (
        <article key={item.id ?? `${item.url}-${index}`} style={{ color: '#F5EDD8' }}>
          <OrnamentalFrame
            alt={item.titulo}
            aspectRatio={index % 3 === 0 ? '4 / 3.35' : '4 / 2.9'}
            className="ornamental-frame--compact"
            src={item.url}
            variant="horizontal"
          />
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
