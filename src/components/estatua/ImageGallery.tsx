import ArchiveGrid from '@/components/editorial/ArchiveGrid'
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard'
import { EstatuaImagen } from '@/types'
import EditorialNum from './EditorialNum'

interface ImageGalleryProps {
  imagenes: EstatuaImagen[]
  nombreEstatua: string
}

export default function ImageGallery({ imagenes, nombreEstatua }: ImageGalleryProps) {
  if (!imagenes.length) {
    return (
      <section className="paper-bg" style={{ backgroundColor: 'var(--bg)', padding: '56px 26px 48px' }}>
        <EditorialNum num="03" label="Vida en Archivos" />
        <div className="hr-brown" style={{ margin: '12px 0 22px' }} />
        <p style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic' }}>
          Aun no tenemos imagenes para esta estatua.
        </p>
      </section>
    )
  }

  const [principal, ...archivo] = imagenes

  return (
    <section className="paper-bg" style={{ backgroundColor: 'var(--bg)', padding: '56px 26px 48px' }}>
      <EditorialNum num="03" label="Vida en Archivos" />
      <div className="hr-brown" style={{ margin: '12px 0 22px' }} />
      <h2 style={{ fontSize: '28px', marginBottom: '28px' }}>Vida en Archivos.</h2>

      <div style={{ display: 'grid', gap: '30px' }}>
        <MuseumFeatureCard
          categoria={principal.categoria}
          descripcion={principal.descripcion}
          frameVariant="full"
          imageUrl={principal.url}
          titulo={principal.titulo || nombreEstatua}
        />
        <ArchiveGrid items={archivo.map((imagen, index) => ({ ...imagen, id: `${imagen.url}-${index}` }))} />
      </div>
    </section>
  )
}
