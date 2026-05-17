import Link from 'next/link'
import Butterfly from '@/components/estatua/Butterfly'
import EditorialNum from '@/components/estatua/EditorialNum'
import FramedPainting from '@/components/estatua/FramedPainting'
import { getTodasEstatuas } from '@/lib/supabase/queries'

export default async function LugaresPage() {
  const estatuas = await getTodasEstatuas()
  const lugares = estatuas.flatMap((estatua) => estatua.lugares)
  const lugaresUnicos = lugares.filter((lugar, index, array) => array.findIndex((item) => item.nombre === lugar.nombre) === index)
  const tones = ['pastoral', 'sepia', 'portrait', 'sky'] as const

  return (
    <main className="paper-bg" style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <section>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '18px 26px 0' }}>
          <Link href="/" style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '14px', fontStyle: 'italic' }}>
            San Lorenzo
          </Link>
          <Link className="editorial-lbl" href="/" style={{ color: 'var(--red)', fontSize: '8px' }}>
            Inicio
          </Link>
        </div>
        <div style={{ padding: '52px 26px 28px', position: 'relative' }}>
          <EditorialNum num="03" label="Lugares para Conocer" />
          <div className="hr-brown" style={{ margin: '12px 0 26px' }} />
          <h1 style={{ fontSize: '56px' }}>
            Lugares
            <br />
            del pueblo.
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.7, marginTop: '18px', maxWidth: '280px' }}>
            Lo que el pueblo camina, ordenado como una invitación serena a quedarse un rato más.
          </p>
          <Butterfly color="var(--red)" size={20} style={{ position: 'absolute', right: '32px', top: '40px' }} />
        </div>
        <div className="hr-brown" style={{ margin: '0 26px' }} />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '32px 26px 48px' }}>
        {lugaresUnicos.map((lugar, index) => (
          <article key={`${lugar.nombre}-${index}`}>
            <FramedPainting alt={lugar.nombre} height={180} tone={tones[index % tones.length]} />
            <div style={{ alignItems: 'flex-start', display: 'flex', gap: '14px', paddingTop: '20px' }}>
              <span style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic', minWidth: '30px' }}>
                /{String(index + 1).padStart(2, '0')}
              </span>
              <div style={{ flex: 1 }}>
                <p className="editorial-lbl" style={{ fontSize: '8px', marginBottom: '8px' }}>
                  {lugar.categoria}
                </p>
                <h2 style={{ fontSize: '22px', lineHeight: 1.1, marginBottom: '10px' }}>{lugar.nombre}</h2>
                <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.7 }}>{lugar.descripcion}</p>
                <span
                  style={{
                    alignItems: 'center',
                    color: 'var(--red)',
                    display: 'inline-flex',
                    fontSize: '9px',
                    fontWeight: 500,
                    gap: '10px',
                    letterSpacing: '0.25em',
                    marginTop: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  Cómo llegar <span style={{ fontSize: '14px' }}>→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
