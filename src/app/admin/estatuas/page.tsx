import Link from 'next/link';
import FramedPainting from '@/components/estatua/FramedPainting';
import { getTodasEstatuas } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function AdminEstatuasPage() {
    const estatuas = await getTodasEstatuas();
    return (<section>
      <div>
        <div>
          <p>
            <span />
            Catálogo
          </p>
          <h1>Estatuas.</h1>
        </div>
        <button>+ Nueva estatua</button>
      </div>

      <div>
        {estatuas.map((estatua, index) => (<article key={estatua.id}>
            <FramedPainting src={estatua.imagenes[0]?.url} alt={estatua.nombre} width={70} height={70} tone={index % 2 === 0 ? 'portrait' : 'ember'}/>
            <div>
              <p>
                /{String(index + 1).padStart(2, '0')} · {estatua.activa ? 'Activa' : 'Borrador'}
              </p>
              <h2>{estatua.nombre}</h2>
              <p>{estatua.subtitulo}</p>
              <p>
                {estatua.capitulos.length} capítulos · {estatua.imagenes.length} imágenes · {estatua.visitas} visitas
              </p>
            </div>
            <Link href={`/admin/estatuas/${estatua.slug}`}>
              Editar
            </Link>
          </article>))}
      </div>
    </section>);
}
