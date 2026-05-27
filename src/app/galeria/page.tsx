import Link from 'next/link'
import ArchiveGrid from '@/components/editorial/ArchiveGrid'
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard'
import { getGaleriaPublica } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const imagenes = await getGaleriaPublica()

  return (
    <main className="sv-bg">
      <div className="sv-shell sv-page-shell">
        <header className="sv-nav" aria-label="Navegacion principal">
          <Link className="sv-brand" href="/">
            <span className="sv-brand-mark">SL</span>
            <span>
              <span className="sv-brand-title">San Lorenzo</span>
              <span className="sv-brand-subtitle">Estatuas Vivas</span>
            </span>
          </Link>
          <nav className="sv-nav-links">
            <Link href="/">Inicio</Link>
            <Link href="/lugares">El Pueblo</Link>
            <Link className="is-active" href="/galeria">Galeria</Link>
          </nav>
          <span className="sv-lang">ES⌄</span>
        </header>

        <section className="sv-page-hero">
          <p className="sv-kicker">03 · Archivo Historico</p>
          <h1>
            Galeria
            <br />
            Historica.
          </h1>
          <span className="sv-red-line" />
          <p className="sv-lead">
            Paisajes, patrimonio, devocion y memoria popular reunidos en el archivo de San Lorenzo.
          </p>
        </section>

        <section className="sv-section sv-gallery-section">
          <div style={{ display: 'grid', gap: '36px' }}>
            {imagenes[0] && (
              <MuseumFeatureCard
                actionLabel="Archivo historico"
                categoria={imagenes[0].categoria}
                descripcion={imagenes[0].descripcion}
                imageUrl={imagenes[0].url}
                titulo={imagenes[0].titulo}
              />
            )}
            <ArchiveGrid items={imagenes.slice(1)} />
          </div>
        </section>
      </div>
    </main>
  )
}
