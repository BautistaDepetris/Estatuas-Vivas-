import Link from 'next/link'
import { getLugaresPueblo } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export default async function LugaresPage() {
  const lugares = await getLugaresPueblo()

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
            <Link className="is-active" href="/lugares">El Pueblo</Link>
            <Link href="/galeria">Galeria</Link>
          </nav>
          <span className="sv-lang">ES⌄</span>
        </header>

        <section className="sv-page-hero">
          <p className="sv-kicker">04 · Lugares para Conocer</p>
          <h1>
            Lugares
            <br />
            del Pueblo.
          </h1>
          <span className="sv-red-line" />
          <p className="sv-lead">
            Una guia antigua para caminar San Lorenzo, quedarse un rato mas y mirar el pueblo con otros ojos.
          </p>
        </section>

        <section className="sv-section">
          <div className="sv-place-list sv-place-list-large">
            {lugares.map((lugar, index) => (
              <article className="sv-place-row" key={lugar.id}>
                <span>/{String(index + 1).padStart(2, '0')}</span>
                {lugar.imagen_url ? (
                  <img src={lugar.imagen_url} alt={lugar.nombre} />
                ) : null}
                <div>
                  <p>{lugar.categoria}</p>
                  <h3>{lugar.nombre}</h3>
                  <small>{lugar.descripcion}</small>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
