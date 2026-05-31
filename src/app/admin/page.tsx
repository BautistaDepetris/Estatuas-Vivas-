import Link from 'next/link';
import { getAdminDashboardData } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
export default async function AdminDashboard() {
    const { estatuas, totalImagenes, totalVisitas } = await getAdminDashboardData();
    const metricas = [
        { numero: totalVisitas.toLocaleString('es-AR'), label: 'Visitas QR', delta: '+18% vs julio' },
        { numero: String(totalImagenes).padStart(2, '0'), label: 'Fotos', delta: '+12 este mes' },
        { numero: String(estatuas.length).padStart(2, '0'), label: 'Estatuas', delta: '2 fichas activas' },
    ];
    return (<div>
      <header>
        <div>
          <p>
            <span />
            Panel principal
          </p>
          <h1>Buen día, Marina.</h1>
        </div>
        <div>
          <Link href="/admin/pagina-principal">Editar Home</Link>
          <Link href="/admin/estatuas">Ver estatuas</Link>
        </div>
      </header>

      <section>
        {metricas.map((metrica, index) => (<article key={metrica.label}>
            <p>
              <span />
              {metrica.label}
            </p>
            <p>
              {metrica.numero}
            </p>
            <p>{metrica.delta}</p>
          </article>))}
      </section>

      <section>
        <div>
          <div>
            <p>
              <span />
              Las estatuas del pueblo
            </p>
            <h2>Catálogo · /{String(estatuas.length).padStart(2, '0')} fichas</h2>
          </div>
          <div>
            <span>Todas</span>
            <span>Activas</span>
            <span>Borrador</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {['/', 'Estatua', 'Subtítulo', 'Capítulos', 'Visitas QR', 'Última edición', 'Estado', 'Acciones'].map((heading) => (<th key={heading}>
                  {heading}
                </th>))}
            </tr>
          </thead>
          <tbody>
            {estatuas.map((estatua, index) => (<tr key={estatua.id}>
                <td>
                  /{index + 1 === 1 ? 'I' : 'II'}
                </td>
                <td>
                  <span>{estatua.nombre}</span>
                </td>
                <td>{estatua.subtitulo}</td>
                <td>{estatua.capitulos.length}</td>
                <td>{estatua.visitas}</td>
                <td>Hace {index === 0 ? 2 : 8} días</td>
                <td>
                  <span>
                    <span />
                    {estatua.activa ? 'Activa' : 'Borrador'}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/estatuas/${estatua.slug}`}>Editar</Link>
                  <span>Archivar</span>
                </td>
              </tr>))}
          </tbody>
        </table>
      </section>
    </div>);
}
