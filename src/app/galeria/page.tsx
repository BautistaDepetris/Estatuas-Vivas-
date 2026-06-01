import Link from 'next/link';
import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { getGaleriaPublica } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function GaleriaPage() {
  const imagenes = await getGaleriaPublica();

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
              <span className="museum-kicker">/03</span>
              <span className="museum-header-line" />
              <span className="museum-label">Archivo Historico</span>
            </div>
            <h1 className="museum-title">
              Galeria
              <br />
              Historica.
            </h1>
            <p className="museum-lede">
              Paisajes, patrimonio, devocion y memoria popular reunidos en el archivo de San Lorenzo.
            </p>
          </div>
        </section>

        <section className="museum-section">
          <div className="museum-inner">
            <div className="card-grid">
              {imagenes.map((imagen) => (
                <EstatuaHomeCard
                  slug={imagen.id}
                  nombre={imagen.titulo}
                  subtitulo={imagen.categoria}
                  descripcion={imagen.descripcion}
                  imagenUrl={imagen.url}
                  imagenAlt={imagen.titulo}
                  ctaLabel="Archivo historico"
                  href="/galeria"
                  key={imagen.id}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
