import Link from 'next/link';
import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { getLugaresPueblo } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function LugaresPage() {
    const lugares = await getLugaresPueblo();
    return (<main className="landing-background">
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
          <span>ES⌄</span>
        </header>

        <section>
          <p>04 · Lugares para Conocer</p>
          <h1>
            Lugares
            <br />
            del Pueblo.
          </h1>
          <span />
          <p>
            Una guia antigua para caminar San Lorenzo, quedarse un rato mas y mirar el pueblo con otros ojos.
          </p>
        </section>

        <section>
          <div>
            {lugares.map((lugar) => (<EstatuaHomeCard
                slug={lugar.id}
                nombre={lugar.nombre}
                subtitulo={lugar.categoria}
                descripcion={lugar.descripcion}
                imagenUrl={lugar.imagen_url ?? undefined}
                imagenAlt={lugar.nombre}
                ctaLabel="Ver lugar"
                href="/lugares"
                key={lugar.id}
              />))}
          </div>
        </section>
      </div>
    </main>);
}
