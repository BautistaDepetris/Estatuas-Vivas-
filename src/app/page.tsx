import Link from 'next/link'
import { getTodasEstatuas } from '@/lib/supabase/queries'
import Butterfly from '@/components/estatua/Butterfly'
import EditorialNum from '@/components/estatua/EditorialNum'
import EstatuaCard from '@/components/estatua/EstatuaCard'
import FramedPainting from '@/components/estatua/FramedPainting'
import LugarRow from '@/components/estatua/LugarRow'

export default async function HomePage() {
  const estatuas = await getTodasEstatuas()
  const imagenesGaleria = estatuas.flatMap((e) => e.imagenes).slice(0, 8)
  const lugaresCombinados = estatuas
    .flatMap((e) => e.lugares.map((l) => ({ ...l, estatuaNombre: e.nombre })))
    .slice(0, 6)

  return (
    <main className="paper-bg" style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <section style={{ paddingBottom: '56px', position: 'relative' }}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '18px 26px 0',
          }}
        >
          <div>
            <Link
              href="/"
              style={{
                color: 'var(--red)',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
            >
              San Lorenzo
            </Link>
            <p className="editorial-lbl" style={{ fontSize: '7px', marginTop: '3px' }}>
              Córdoba · Argentina
            </p>
          </div>
          <button
            aria-label="Abrir menú"
            style={{ background: 'transparent', border: 0, display: 'inline-flex', gap: '3px', padding: '8px' }}
          >
            <span style={{ background: 'var(--red)', height: '3px', width: '3px' }} />
            <span style={{ background: 'var(--red)', height: '3px', width: '3px' }} />
            <span style={{ background: 'var(--red)', height: '3px', width: '3px' }} />
          </button>
        </div>

        <div style={{ padding: '36px 26px 0', position: 'relative' }}>
          <h1 style={{ fontSize: '62px', lineHeight: 0.92 }}>
            Las
            <br />
            Estatuas
            <br />
            Cobran
          </h1>
          <div style={{ alignItems: 'flex-end', display: 'flex', gap: '14px', marginTop: '4px' }}>
            <FramedPainting
              src={imagenesGaleria[0]?.url}
              alt={imagenesGaleria[0]?.titulo ?? 'Archivo histórico'}
              width={72}
              height={54}
              tone="portrait"
              priority
            />
            <h1 style={{ fontSize: '62px', lineHeight: 0.92 }}>Vida.</h1>
          </div>
          <p className="editorial-lbl" style={{ marginTop: '18px' }}>
            Patrimonio Cultural · Córdoba, Argentina
          </p>
        </div>

        <div style={{ padding: '36px 26px 0' }}>
          <p
            style={{
              color: 'var(--ink-2)',
              fontFamily: 'var(--font-display)',
              fontSize: '15px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              maxWidth: '280px',
            }}
          >
            Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.
          </p>
        </div>

        <div style={{ padding: '32px 26px 0' }}>
          <Link className="btn-red" href="#estatuas">
            Explorar el pueblo <span>→</span>
          </Link>
        </div>

        <Butterfly color="var(--brown)" size={22} style={{ position: 'absolute', right: '28px', top: '110px' }} />
      </section>

      <section id="estatuas" className="paper-bg" style={{ background: 'var(--bg)', padding: '40px 26px 56px' }}>
        <EditorialNum num="01" label="Las Estatuas" />
        <div className="hr-brown" style={{ margin: '12px 0 28px' }} />
        <h2 style={{ fontSize: '36px' }}>
          Dos figuras,
          <br />
          dos siglos.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginTop: '36px' }}>
          {estatuas.map((estatua, index) => (
            <EstatuaCard key={estatua.id} estatua={estatua} tone={index % 2 === 0 ? 'portrait' : 'ember'} />
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: '48px 26px 56px' }}>
        <EditorialNum num="02" label="Galería Histórica" />
        <div className="hr-brown" style={{ background: 'var(--border-dark)', margin: '12px 0 22px' }} />
        <p
          style={{
            color: 'var(--ink-2)',
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            fontStyle: 'italic',
            lineHeight: 1.5,
            marginBottom: '28px',
            maxWidth: '280px',
          }}
        >
          Imágenes del archivo del pueblo, paisajes serranos y memoria popular.
        </p>
        <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: '1fr 1fr', marginBottom: '26px' }}>
          {imagenesGaleria.map((img, index) => (
            <article key={`${img.url}-${index}`}>
              <FramedPainting src={img.url} alt={img.titulo} height={140} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
              <div style={{ paddingTop: '10px' }}>
                <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '4px' }}>
                  {img.categoria}
                </p>
                <h3 style={{ fontSize: '13px', lineHeight: 1.15 }}>{img.titulo}</h3>
              </div>
            </article>
          ))}
        </div>
        <Link className="btn-outline-red" href="/galeria">
          Ver galería completa <span>→</span>
        </Link>
      </section>

      <section className="paper-bg" style={{ background: 'var(--bg)', padding: '48px 26px 56px' }}>
        <EditorialNum num="03" label="Lugares para Conocer" />
        <div className="hr-brown" style={{ margin: '12px 0 28px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lugaresCombinados.map((lugar, index) => (
            <LugarRow key={`${lugar.nombre}-${index}`} lugar={lugar} index={index} last={index === lugaresCombinados.length - 1} />
          ))}
        </div>
      </section>

      <footer className="paper-bg" style={{ background: 'var(--bg)', padding: '40px 26px 32px' }}>
        <div className="hr-brown" style={{ background: 'var(--border-dark)', marginBottom: '26px' }} />
        <h2 style={{ color: 'var(--red)', fontSize: '30px', marginBottom: '6px' }}>San Lorenzo</h2>
        <p className="editorial-lbl" style={{ marginBottom: '28px' }}>
          Patrimonio Cultural Digital · Córdoba
        </p>
        <nav
          style={{
            color: 'var(--ink-4)',
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: '8px',
            gap: '16px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          <Link href="#estatuas">Estatuas</Link>
          <Link href="/galeria">Galería</Link>
          <Link href="/lugares">Lugares</Link>
        </nav>
        <p
          style={{
            color: 'var(--ink-4)',
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            fontStyle: 'italic',
            lineHeight: 1.7,
            marginTop: '24px',
          }}
        >
          © 2026 - Una iniciativa del Municipio de San Lorenzo.
        </p>
      </footer>
    </main>
  )
}
