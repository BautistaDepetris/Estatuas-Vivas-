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
  border: '1px solid rgba(89,54,14,0.48)',
  boxShadow: '0 24px 48px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(255,248,222,0.82)',
  color: '#1C1008',
  display: 'flex',
  flex: '0 0 min(350px, 84vw)',
  flexDirection: 'column',
  overflow: 'hidden',
} as const

const galleryFrameStyle = {
  background: 'linear-gradient(135deg, #5D340B 0%, #C9A84C 16%, #F3DA86 27%, #8A5D1A 45%, #D4B258 62%, #6A3C0E 82%, #E7C76D 100%)',
  border: '11px solid #C9A84C',
  boxShadow: [
    'inset 0 0 0 2px rgba(84,48,10,0.9)',
    'inset 0 0 0 6px rgba(255,232,150,0.42)',
    'inset 0 0 24px rgba(29,15,3,0.72)',
    '0 1px 0 rgba(255,246,202,0.5)',
  ].join(', '),
  height: '206px',
  margin: '14px 14px 0',
  outline: '2px solid rgba(242,207,111,0.9)',
  outlineOffset: '-7px',
  padding: '5px',
} as const

const galleryPhotoStyle = {
  filter: 'sepia(0.32) saturate(0.78) contrast(1.04) brightness(0.92)',
  height: '100%',
  objectFit: 'cover',
  width: '100%',
} as const

const galleryContentStyle = {
  background: '#F5EDD8',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '20px 24px 24px',
} as const

const galleryButtonStyle = {
  alignItems: 'center',
  background: '#8B1A1A',
  color: '#F5EDD8',
  display: 'inline-flex',
  fontSize: '10px',
  justifyContent: 'center',
  letterSpacing: '0.22em',
  marginTop: '18px',
  padding: '13px 16px',
  textTransform: 'uppercase',
} as const

const horizontalScrollStyle = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '24px',
  overflowX: 'auto',
  paddingBottom: '10px',
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
                </div>
                <div style={galleryContentStyle}>
                  <p style={{ color: '#8B1A1A', fontSize: '9px', letterSpacing: '0.28em', marginBottom: '10px', textTransform: 'uppercase' }}>
                    {imagen.categoria}
                  </p>
                  <h3 style={{ color: '#251409', fontFamily: 'var(--font-display)', fontSize: '30px', fontStyle: 'italic', lineHeight: 1.02 }}>{imagen.titulo}</h3>
                  <p style={{ color: '#3D2A14', flex: 1, fontSize: '14px', lineHeight: 1.5, marginTop: '12px' }}>{imagen.descripcion}</p>
                  <Link href="/galeria" style={galleryButtonStyle}>
                    Ver detalle
                  </Link>
                </div>
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
