import Link from 'next/link';
import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { getGaleriaPublica } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function GaleriaPage() {
    const imagenes = await getGaleriaPublica();
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
          <p>03 · Archivo Historico</p>
          <h1>
            Galeria
            <br />
            Historica.
          </h1>
          <span />
          <p>
            Paisajes, patrimonio, devocion y memoria popular reunidos en el archivo de San Lorenzo.
          </p>
        </section>

        <section>
          <div>
            {imagenes.map((imagen) => (<EstatuaHomeCard
                slug={imagen.id}
                nombre={imagen.titulo}
                subtitulo={imagen.categoria}
                descripcion={imagen.descripcion}
                imagenUrl={imagen.url}
                imagenAlt={imagen.titulo}
                ctaLabel="Archivo historico"
                href="/galeria"
                key={imagen.id}
              />))}
          </div>
        </section>
      </div>
    </main>);
}
