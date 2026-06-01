import Link from 'next/link';
import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { getLugaresPueblo } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function LugaresPage() {
  const lugares = await getLugaresPueblo();

  return (
    <main className="landing-background page-shell">
      <div>
        <header aria-label="Navegacion principal">
          <Link href="/">
            <span>SL</span>
            <span>
              <span>San Lorenzo</span>
              <span>Estatuas Vivas</span>
            </span>
          </Link>
          <nav>
            <Link href="/">Inicio</Link>
            <Link href="/lugares">El Pueblo</Link>
            <Link href="/galeria">Galeria</Link>
          </nav>
          <span>ES</span>
        </header>

        <section className="museum-section">
          <div className="museum-inner">
            <div className="museum-header">
              <span className="museum-kicker">/04</span>
              <span className="museum-header-line" />
              <span className="museum-label">Lugares para Conocer</span>
            </div>
            <h1 className="museum-title">
              Lugares
              <br />
              del Pueblo.
            </h1>
            <p className="museum-lede">
              Una guia antigua para caminar San Lorenzo, quedarse un rato mas y mirar el pueblo con otros ojos.
            </p>
          </div>
        </section>

        <section className="museum-section">
          <div className="museum-inner">
            <div className="card-grid">
              {lugares.map((lugar) => (
                <EstatuaHomeCard
                  slug={lugar.id}
                  nombre={lugar.nombre}
                  subtitulo={lugar.categoria}
                  descripcion={lugar.descripcion}
                  imagenUrl={lugar.imagen_url ?? undefined}
                  imagenAlt={lugar.nombre}
                  ctaLabel="Ver lugar"
                  href="/lugares"
                  key={lugar.id}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
