import Link from 'next/link';
import ArchiveGrid from '@/components/editorial/ArchiveGrid';
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard';
import { getGaleriaPublica } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function GaleriaPage() {
    const imagenes = await getGaleriaPublica();
    return (<main>
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
            {imagenes[0] && (<MuseumFeatureCard actionLabel="Archivo historico" categoria={imagenes[0].categoria} descripcion={imagenes[0].descripcion} imageUrl={imagenes[0].url} titulo={imagenes[0].titulo}/>)}
            <ArchiveGrid items={imagenes.slice(1)}/>
          </div>
        </section>
      </div>
    </main>);
}
