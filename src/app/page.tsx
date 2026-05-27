import Link from 'next/link'
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

const framedImageStyle = {
  background: 'linear-gradient(135deg, #6F3E0D 0%, #C9A84C 22%, #F0D27A 34%, #8A5D1A 58%, #D5B15B 78%, #5F330C 100%)',
  border: '9px solid #C9A84C',
  boxShadow: 'inset 0 0 0 2px rgba(82,47,12,0.72), inset 0 0 0 5px rgba(247,218,126,0.34), inset 0 0 22px rgba(31,16,4,0.68)',
  height: '190px',
  outline: '1px solid rgba(255,229,150,0.5)',
  outlineOffset: '-5px',
  padding: '4px',
} as const

const framedPhotoStyle = {
  filter: 'sepia(0.34) saturate(0.74) contrast(1.04) brightness(0.9)',
  height: '100%',
  objectFit: 'cover',
  width: '100%',
} as const

const horizontalCardStyle = {
  background: '#F5EDD8',
  border: '1px solid rgba(201,168,76,0.82)',
  boxShadow: '0 18px 42px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(255,245,210,0.42)',
  color: '#1C1008',
  flex: '0 0 min(340px, 82vw)',
  overflow: 'hidden',
} as const

const galleryCardStyle = {
  background: '#F5EDD8',
  border: '6px solid #1C1008',
  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
  color: '#1C1008',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  minWidth: '280px',
  overflow: 'hidden',
  width: 'min(340px, 82vw)',
} as const

const galleryFrameStyle = {
  background: '#1C1008',
  borderBottom: '6px solid #1C1008',
  height: '214px',
  overflow: 'hidden',
  position: 'relative',
} as const

const galleryPhotoStyle = {
  display: 'block',
  filter: 'sepia(0.28) saturate(0.82) contrast(1.08) brightness(0.9)',
  height: '72%',
  left: '7%',
  objectFit: 'cover',
  position: 'absolute',
  top: '16%',
  width: '86%',
  zIndex: 1,
} as const

const galleryFrameOverlayStyle = {
  height: '150%',
  left: '-13%',
  objectFit: 'fill',
  pointerEvents: 'none',
  position: 'absolute',
  top: '-25%',
  width: '126%',
  zIndex: 2,
} as const

const galleryContentStyle = {
  backgroundColor: '#F5EDD8',
  backgroundImage: 'linear-gradient(rgba(245,237,216,0.82), rgba(245,237,216,0.82)), url("/assets/textura-papel.png.png")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minHeight: '148px',
  padding: '22px 28px 20px',
} as const

const galleryButtonStyle = {
  alignItems: 'center',
  background: '#8B1A1A',
  color: '#F5EDD8',
  display: 'inline-flex',
  fontSize: '12px',
  justifyContent: 'space-between',
  letterSpacing: '0.28em',
  marginTop: '0',
  padding: '18px 28px',
  textTransform: 'uppercase',
  width: '100%',
} as const

const horizontalScrollStyle = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '22px',
  marginRight: '-26px',
  msOverflowStyle: 'none',
  overflowX: 'auto',
  paddingBottom: '10px',
  paddingRight: '26px',
  scrollbarWidth: 'none',
} as const

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
                <div className="sv-archive-image">
                  {estatua.imagenes[0]?.url ? <img src={estatua.imagenes[0].url} alt={estatua.nombre} /> : <span />}
                </div>
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
          <Link className="sv-text-link" href="/galeria" style={{ margin: '0 0 30px' }}>
            Ver galeria completa <span>→</span>
          </Link>
          <div className="scroll-x" style={horizontalScrollStyle}>
            {imagenesGaleria.slice(0, 6).map((imagen) => (
              <article key={imagen.id} style={galleryCardStyle}>
                <div style={galleryFrameStyle}>
                  <img src={imagen.url} alt={imagen.titulo} style={galleryPhotoStyle} />
                  <img src="/assets/marco-dorado.png.png" alt="" aria-hidden="true" style={galleryFrameOverlayStyle} />
                </div>
                <div style={galleryContentStyle}>
                  <p style={{ color: '#8B1A1A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {imagen.categoria}
                  </p>
                  <h3 style={{ color: '#1C1008', fontFamily: 'var(--font-display)', fontSize: '31px', fontStyle: 'italic', lineHeight: 1.02 }}>{imagen.titulo}</h3>
                  <p style={{ color: '#3D2B1F', flex: 1, fontSize: '14px', lineHeight: 1.38, marginTop: '12px' }}>{imagen.descripcion}</p>
                </div>
                <Link href="/galeria" style={galleryButtonStyle}>
                  <span>Ver más</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="sv-section" id="contacto" style={{ background: '#0D0D0D' }}>
          <div className="sv-section-heading">
            <p>03 · Lugares</p>
            <h2>El pueblo recomienda.</h2>
          </div>
          <div className="scroll-x" style={horizontalScrollStyle}>
            {lugaresPueblo.slice(0, 6).map((lugar, index) => (
              <article key={lugar.id} style={horizontalCardStyle}>
                <div style={{ ...framedImageStyle, background: 'linear-gradient(135deg, #0D0D0D, #211A12)' }}>
                  {lugar.imagen_url ? (
                    <img src={lugar.imagen_url} alt={lugar.nombre} style={framedPhotoStyle} />
                  ) : (
                    <div style={{ background: '#0D0D0D', height: '100%', width: '100%' }} />
                  )}
                </div>
                <div style={{ padding: '18px 22px 22px' }}>
                  <p style={{ color: '#8B1A1A', fontSize: '11px', letterSpacing: '0.24em', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {lugar.categoria}
                  </p>
                  <h3 style={{ color: '#251409', fontSize: '25px', lineHeight: 1.05 }}>{lugar.nombre}</h3>
                  <p style={{ color: '#3D2A14', fontSize: '14px', lineHeight: 1.4, marginTop: '10px' }}>{lugar.descripcion}</p>
                  <span style={{ color: '#8B1A1A', display: 'block', fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic', marginTop: '14px' }}>
                    /{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
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
