import Link from 'next/link'
import { getGaleriaPublica, getLugaresPueblo, getTodasEstatuas } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

const navItems = [
  ['Inicio', '/'],
  ['El Pueblo', '/lugares'],
  ['Estatuas', '#estatuas'],
  ['Archivo Histórico', '/galeria'],
  ['Galería', '/galeria'],
  ['Visitas', '/lugares'],
  ['Contacto', '#contacto'],
] as const

export default async function HomePage() {
  const [estatuas, imagenesGaleria, lugaresPueblo] = await Promise.all([
    getTodasEstatuas(),
    getGaleriaPublica(),
    getLugaresPueblo(),
  ])

  const cards = [
    {
      action: 'Ver más',
      categoria: imagenesGaleria[0]?.categoria || 'Paisaje',
      descripcion: imagenesGaleria[0]?.descripcion || 'Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.',
      href: '/galeria',
      image: imagenesGaleria[0]?.url,
      title: imagenesGaleria[0]?.titulo || 'Sierras al Atardecer',
    },
    {
      action: 'Ver archivo',
      categoria: 'Patrimonio',
      descripcion: 'Imágenes, fotografías y relatos que guardan la memoria de nuestro pueblo.',
      href: '/galeria',
      image: imagenesGaleria[1]?.url || imagenesGaleria[0]?.url,
      title: 'Historia de San Lorenzo',
    },
    {
      action: 'Conocer más',
      categoria: 'Devoción',
      descripcion: 'La religiosidad popular y las tradiciones que siguen vivas generación tras generación.',
      href: estatuas[0] ? `/estatuas/${estatuas[0].slug}` : '/galeria',
      image: imagenesGaleria[2]?.url || imagenesGaleria[0]?.url,
      title: 'Fe que Nos Une',
    },
  ]

  return (
    <main className="home-bg">
      <div className="home-shell">
        <header className="home-header" aria-label="Navegación principal">
          <Link className="home-brand" href="/">
            <span className="home-brand-mark">⚜</span>
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
          <span className="home-lang">ES⌄</span>
        </header>

        <section className="home-hero">
          <div className="home-hero-portrait" />
          <div className="home-hero-copy">
            <p className="home-kicker">Patrimonio Cultural · Córdoba, Argentina</p>
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

          <div className="home-card-row" aria-label="Destacados">
            {cards.map((card) => (
              <Link className="home-feature-card" href={card.href} key={card.title}>
                <div className="home-card-image">
                  {card.image ? <img src={card.image} alt={card.title} /> : <span />}
                </div>
                <div className="home-card-copy">
                  <p>{card.categoria}</p>
                  <h2>{card.title}</h2>
                  <span>{card.descripcion}</span>
                </div>
                <div className="home-card-action">
                  {card.action} <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="sv-section" id="estatuas">
          <div className="sv-section-heading">
            <p>01 · Estatuas</p>
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

        <section className="sv-section sv-paper-section">
          <div className="sv-section-heading">
            <p>02 · Galeria Historica</p>
            <h2>Archivo visual del pueblo.</h2>
          </div>
          <div className="sv-mini-grid">
            {imagenesGaleria.slice(0, 6).map((imagen) => (
              <article className="sv-mini-item" key={imagen.id}>
                <img src={imagen.url} alt={imagen.titulo} />
                <p>{imagen.categoria}</p>
                <h3>{imagen.titulo}</h3>
              </article>
            ))}
          </div>
          <Link className="sv-paper-link" href="/galeria">
            Ver galeria completa <span>→</span>
          </Link>
        </section>

        <section className="sv-section" id="contacto">
          <div className="sv-section-heading">
            <p>03 · Lugares</p>
            <h2>El pueblo recomienda.</h2>
          </div>
          <div className="sv-place-list">
            {lugaresPueblo.slice(0, 4).map((lugar, index) => (
              <article className="sv-place-row" key={lugar.id}>
                <span>/{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{lugar.categoria}</p>
                  <h3>{lugar.nombre}</h3>
                  <small>{lugar.descripcion}</small>
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
