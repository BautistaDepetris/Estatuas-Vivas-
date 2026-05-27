import Link from 'next/link'
import ArchiveGrid from '@/components/editorial/ArchiveGrid'
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard'
import OrnamentalFrame from '@/components/editorial/OrnamentalFrame'
import PlaceEditorialCard from '@/components/editorial/PlaceEditorialCard'
import { getGaleriaPublica, getLugaresPueblo, getTodasEstatuas } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

const navItems = [
  ['Inicio', '/'],
  ['El Pueblo', '/lugares'],
  ['Estatuas', '#estatuas'],
  ['Archivo Historico', '/galeria'],
  ['Galeria', '/galeria'],
  ['Visitas', '/lugares'],
  ['Contacto', '#contacto'],
] as const

export default async function HomePage() {
  const [estatuas, imagenesGaleria, lugaresPueblo] = await Promise.all([
    getTodasEstatuas(),
    getGaleriaPublica(),
    getLugaresPueblo(),
  ])

  return (
    <main className="home-bg">
      <div className="home-shell">
        <header className="home-header" aria-label="Navegacion principal">
          <Link className="home-brand" href="/">
            <span className="home-brand-mark">SL</span>
            <span>
              <span className="home-brand-title">San Lorenzo</span>
              <span className="home-brand-subtitle">Estatuas Vivas</span>
            </span>
          </Link>
          <nav className="home-nav-links">
            {navItems.map(([label, href], index) => (
              <Link key={label} className={index === 0 ? 'is-active' : undefined} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <span className="home-lang">ES</span>
        </header>

        <section className="home-hero" style={{ paddingBottom: '80px' }}>
          <div className="home-hero-portrait" />
          <div className="home-hero-copy">
            <p className="home-kicker">Patrimonio Cultural · Cordoba, Argentina</p>
            <h1>
              Las
              <br />
              Estatuas
              <br />
              Cobran Vida.
            </h1>
            <span className="home-red-line" />
            <p className="home-lead">Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.</p>
            <Link className="home-cta" href="/lugares">
              Explorar el pueblo <span>→</span>
            </Link>
          </div>
        </section>

        <section className="sv-section" id="estatuas">
          <div className="sv-section-heading">
            <p style={{ color: '#F5EDD8' }}>01 · Estatuas</p>
            <h2>Historias que esperan ser escuchadas.</h2>
          </div>
          <div className="sv-archive-grid">
            {estatuas.map((estatua) => (
              <Link className="sv-archive-card" href={`/estatuas/${estatua.slug}`} key={estatua.id}>
                <OrnamentalFrame
                  alt={estatua.nombre}
                  aspectRatio="16 / 10.4"
                  className="ornamental-frame--compact"
                  src={estatua.imagenes[0]?.url}
                  variant="sides"
                />
                <p>{estatua.subtitulo}</p>
                <h3>{estatua.nombre}</h3>
                <span>{estatua.frase}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sv-section" style={{ background: '#0D0D0D' }}>
          <div className="sv-section-heading">
            <p>02 · Galeria Historica</p>
            <h2>Archivo visual del pueblo.</h2>
          </div>
          <div style={{ display: 'grid', gap: '28px' }}>
            {imagenesGaleria[0] && (
              <MuseumFeatureCard
                actionHref="/galeria"
                actionLabel="Ver galeria"
                categoria={imagenesGaleria[0].categoria}
                descripcion={imagenesGaleria[0].descripcion}
                imageUrl={imagenesGaleria[0].url}
                titulo={imagenesGaleria[0].titulo}
              />
            )}
            <ArchiveGrid items={imagenesGaleria.slice(1, 5)} />
            <Link className="sv-text-link" href="/galeria" style={{ justifySelf: 'start', marginTop: '6px' }}>
              Ver galeria completa <span>→</span>
            </Link>
          </div>
        </section>

        <section className="sv-section" id="contacto" style={{ background: '#0D0D0D' }}>
          <div className="sv-section-heading">
            <p>03 · Lugares</p>
            <h2>El pueblo recomienda.</h2>
          </div>
          <div style={{ borderBottom: '1px solid rgba(201,168,76,0.32)' }}>
            {lugaresPueblo.slice(0, 4).map((lugar, index) => (
              <PlaceEditorialCard
                categoria={lugar.categoria}
                descripcion={lugar.descripcion}
                imageUrl={lugar.imagen_url}
                index={index}
                key={lugar.id}
                nombre={lugar.nombre}
              />
            ))}
          </div>
          <Link className="sv-text-link" href="/lugares">
            Ver todos los lugares <span>→</span>
          </Link>
        </section>
      </div>
    </main>
  )
}
