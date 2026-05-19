import Link from 'next/link'
import { getTodasEstatuas } from '@/lib/supabase/queries'

export default async function AdminDashboard() {
  const estatuas = await getTodasEstatuas()
  const totalImagenes = estatuas.reduce((acc, e) => acc + e.imagenes.length, 0)
  const totalVisitas = estatuas.reduce((acc, e) => acc + e.visitas, 0)

  const metricas = [
    { numero: totalVisitas.toLocaleString('es-AR'), label: 'Visitas QR', delta: '+18% vs julio' },
    { numero: String(totalImagenes).padStart(2, '0'), label: 'Fotos', delta: '+12 este mes' },
    { numero: String(estatuas.length).padStart(2, '0'), label: 'Estatuas', delta: '2 fichas activas' },
  ]

  return (
    <div>
      <header
        style={{
          alignItems: 'center',
          borderBottom: '0.5px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '26px 40px',
        }}
      >
        <div>
          <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '12px' }}>
            <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
            Panel principal
          </p>
          <h1 style={{ fontSize: '36px', marginTop: '14px' }}>Buen día, Marina.</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link className="btn-outline-red" href="/admin/pagina-principal">Editar Home</Link>
          <Link className="btn-red" href="/admin/estatuas">Ver estatuas</Link>
        </div>
      </header>

      <section
        style={{
          borderBottom: '0.5px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        }}
      >
        {metricas.map((metrica, index) => (
          <article
            key={metrica.label}
            style={{
              borderRight: index < metricas.length - 1 ? '0.5px solid var(--border)' : 'none',
              padding: '36px 40px',
            }}
          >
            <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '18px' }}>
              <span style={{ background: 'var(--red)', height: '0.5px', width: '16px' }} />
              {metrica.label}
            </p>
            <p style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '64px', fontStyle: 'italic', lineHeight: 1 }}>
              {metrica.numero}
            </p>
            <p style={{ color: 'var(--ink-4)', fontSize: '10px', letterSpacing: '0.05em', marginTop: '14px' }}>{metrica.delta}</p>
          </article>
        ))}
      </section>

      <section style={{ padding: '40px 40px 48px' }}>
        <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
              <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
              Las estatuas del pueblo
            </p>
            <h2 style={{ fontSize: '28px' }}>Catálogo · /{String(estatuas.length).padStart(2, '0')} fichas</h2>
          </div>
          <div className="editorial-lbl" style={{ display: 'flex', gap: '18px', fontSize: '8px' }}>
            <span style={{ borderBottom: '0.5px solid var(--red)', color: 'var(--red)', paddingBottom: '4px' }}>Todas</span>
            <span>Activas</span>
            <span>Borrador</span>
          </div>
        </div>

        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '0.5px solid var(--border)', borderTop: '0.5px solid var(--border)' }}>
              {['/', 'Estatua', 'Subtítulo', 'Capítulos', 'Visitas QR', 'Última edición', 'Estado', 'Acciones'].map((heading) => (
                <th key={heading} className="editorial-lbl" style={{ fontSize: '8px', fontWeight: 500, padding: '14px 8px', textAlign: 'left' }}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {estatuas.map((estatua, index) => (
              <tr key={estatua.id} style={{ borderBottom: '0.5px solid var(--border)' }}>
                <td style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '16px', fontStyle: 'italic', padding: '22px 8px' }}>
                  /{index + 1 === 1 ? 'I' : 'II'}
                </td>
                <td style={{ padding: '22px 8px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic' }}>{estatua.nombre}</span>
                </td>
                <td style={{ color: 'var(--ink-3)', fontSize: '11px', padding: '22px 8px' }}>{estatua.subtitulo}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic', padding: '22px 8px' }}>{estatua.capitulos.length}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic', padding: '22px 8px' }}>{estatua.visitas}</td>
                <td style={{ color: 'var(--ink-4)', fontSize: '10px', padding: '22px 8px' }}>Hace {index === 0 ? 2 : 8} días</td>
                <td style={{ padding: '22px 8px' }}>
                  <span className="editorial-lbl" style={{ alignItems: 'center', color: 'var(--red)', display: 'inline-flex', fontSize: '8px', gap: '8px' }}>
                    <span style={{ background: 'var(--red)', height: '5px', width: '5px' }} />
                    {estatua.activa ? 'Activa' : 'Borrador'}
                  </span>
                </td>
                <td className="editorial-lbl" style={{ color: 'var(--brown)', fontSize: '9px', padding: '22px 8px' }}>
                  <Link href={`/admin/estatuas/${estatua.slug}`} style={{ color: 'var(--red)' }}>Editar</Link>
                  <span style={{ color: 'var(--ink-4)', marginLeft: '16px' }}>Archivar</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
