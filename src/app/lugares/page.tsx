import Link from 'next/link';
import PlaceEditorialCard from '@/components/editorial/PlaceEditorialCard';
import { getLugaresPueblo } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function LugaresPage() {
    const lugares = await getLugaresPueblo();
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
            {lugares.map((lugar, index) => (<PlaceEditorialCard categoria={lugar.categoria} descripcion={lugar.descripcion} imageUrl={lugar.imagen_url} index={index} key={lugar.id} nombre={lugar.nombre}/>))}
          </div>
        </section>
      </div>
    </main>);
}
