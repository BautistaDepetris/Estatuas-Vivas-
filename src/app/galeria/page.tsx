import Link from 'next/link'
import Butterfly from '@/components/estatua/Butterfly'
import EditorialNum from '@/components/estatua/EditorialNum'
import FramedPainting from '@/components/estatua/FramedPainting'
import { getTodasEstatuas } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const estatuas = await getTodasEstatuas()
  const imagenes = estatuas.flatMap((estatua) =>
    estatua.imagenes.map((imagen) => ({
      ...imagen,
      estatuaNombre: estatua.nombre,
    }))
  )

  return (
    <main className="paper-bg" style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <section style={{ paddingBottom: '24px' }}>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '18px 26px 0' }}>
          <Link href="/" style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '14px', fontStyle: 'italic' }}>
            San Lorenzo
          </Link>
          <Link className="editorial-lbl" href="/" style={{ color: 'var(--red)', fontSize: '8px' }}>
            Inicio
          </Link>
        </div>
        <div style={{ padding: '52px 26px 28px', position: 'relative' }}>
          <EditorialNum num="03" label="Archivo Histórico" />
          <div className="hr-brown" style={{ margin: '12px 0 26px' }} />
          <h1 style={{ fontSize: '56px' }}>
            Galería
            <br />
            Histórica.
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.7, marginTop: '18px', maxWidth: '280px' }}>
            Imágenes del archivo del pueblo. Fotografías, paisajes y estampas reunidas desde las historias de cada estatua.
          </p>
          <Butterfly color="var(--brown)" size={20} style={{ position: 'absolute', right: '32px', top: '40px' }} />
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: '8px',
            gap: '8px',
            letterSpacing: '0.28em',
            padding: '0 26px 18px',
            textTransform: 'uppercase',
          }}
        >
          {['Todo', 'Paisaje', 'Patrimonio', 'Devoción'].map((tab, index) => (
            <span
              key={tab}
              style={{
                border: `0.5px solid ${index === 0 ? 'var(--red)' : 'var(--border)'}`,
                color: index === 0 ? 'var(--red)' : 'var(--brown)',
                padding: '10px 12px',
              }}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="hr-brown" />
      </section>

      <section style={{ padding: '28px 26px 48px' }}>
        <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: '1fr 1fr' }}>
          {[0, 1].map((column) => (
            <div key={column} style={{ paddingTop: column === 1 ? '36px' : 0 }}>
              {imagenes
                .filter((_, index) => index % 2 === column)
                .map((imagen, index) => (
                  <article key={`${imagen.url}-${column}-${index}`} style={{ marginBottom: '26px' }}>
                    <FramedPainting
                      src={imagen.url}
                      alt={imagen.titulo}
                      height={column === 0 ? (index % 2 === 0 ? 250 : 210) : index % 2 === 0 ? 190 : 290}
                      tone={column === 0 ? 'sepia' : 'sky'}
                    />
                    <div style={{ paddingTop: '10px' }}>
                      <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '6px' }}>
                        {imagen.categoria}
                      </p>
                      <h2 style={{ fontSize: '15px', lineHeight: 1.15, marginBottom: '4px' }}>{imagen.titulo}</h2>
                      <p style={{ color: 'var(--ink-3)', fontSize: '10px', lineHeight: 1.55 }}>{imagen.descripcion}</p>
                    </div>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
