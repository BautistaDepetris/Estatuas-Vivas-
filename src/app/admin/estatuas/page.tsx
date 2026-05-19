import Link from 'next/link'
import FramedPainting from '@/components/estatua/FramedPainting'
import { getTodasEstatuas } from '@/lib/supabase/queries'

export default async function AdminEstatuasPage() {
  const estatuas = await getTodasEstatuas()

  return (
    <section style={{ padding: '40px' }}>
      <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
            <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
            Catálogo
          </p>
          <h1 style={{ fontSize: '36px' }}>Estatuas.</h1>
        </div>
        <button className="btn-red">+ Nueva estatua</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {estatuas.map((estatua, index) => (
          <article
            key={estatua.id}
            style={{
              alignItems: 'flex-start',
              borderBottom: '0.5px solid var(--border)',
              display: 'flex',
              gap: '18px',
              padding: '22px 0',
            }}
          >
            <FramedPainting src={estatua.imagenes[0]?.url} alt={estatua.nombre} width={70} height={70} tone={index % 2 === 0 ? 'portrait' : 'ember'} />
            <div style={{ flex: 1 }}>
              <p className="editorial-lbl" style={{ fontSize: '8px', marginBottom: '6px' }}>
                /{String(index + 1).padStart(2, '0')} · {estatua.activa ? 'Activa' : 'Borrador'}
              </p>
              <h2 style={{ color: 'var(--red)', fontSize: '28px', marginBottom: '8px' }}>{estatua.nombre}</h2>
              <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.6 }}>{estatua.subtitulo}</p>
              <p className="editorial-lbl" style={{ color: 'var(--ink-4)', fontSize: '8px', marginTop: '12px' }}>
                {estatua.capitulos.length} capítulos · {estatua.imagenes.length} imágenes · {estatua.visitas} visitas
              </p>
            </div>
            <Link className="btn-ghost" href={`/admin/estatuas/${estatua.slug}`}>
              Editar
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
