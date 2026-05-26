import Link from 'next/link'
import { getGaleriaPublica, getLugaresPueblo, getTodasEstatuas } from '@/lib/supabase/queries'
import Butterfly from '@/components/estatua/Butterfly'
import EditorialNum from '@/components/estatua/EditorialNum'
import EstatuaCard from '@/components/estatua/EstatuaCard'
import FramedPainting from '@/components/estatua/FramedPainting'
import LugarRow from '@/components/estatua/LugarRow'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [estatuas, imagenesGaleria, lugaresCombinados] = await Promise.all([
    getTodasEstatuas(),
    getGaleriaPublica(),
    getLugaresPueblo(),
  ])
  const imagenHero = estatuas[0]?.imagenes[0]?.url ?? imagenesGaleria[0]?.url

  return (
    <main className="paper-bg" style={{ color: 'var(--ink)', minHeight: '100vh' }}>
      <div className="museum-shell">
        <section className="museum-hero">
          <div
            className="museum-hero-media"
            style={{
              backgroundImage: imagenHero ? `url(${imagenHero})` : undefined,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '24px clamp(26px, 7vw, 104px) 0',
              position: 'relative',
              zIndex: 4,
            }}
          >
            <div>
              <Link href="/" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: '16px', fontStyle: 'italic' }}>
                San Lorenzo
              </Link>
              <p className="editorial-lbl" style={{ color: 'var(--brown)', fontSize: '7px', marginTop: '3px' }}>
                Cordoba - Argentina
              </p>
            </div>
            <nav
              style={{
                color: 'var(--ink-2)',
                display: 'flex',
                flexWrap: 'wrap',
                fontSize: '12px',
                gap: '28px',
              }}
            >
              <Link href="#estatuas">Estatuas</Link>
              <Link href="/galeria">Galeria</Link>
              <Link href="/lugares">Lugares</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>

          <div className="museum-hero-content">
            <div style={{ alignItems: 'center', display: 'flex', gap: '16px', margin: '82px 0 22px' }}>
              <span style={{ background: 'var(--border-dark)', height: '1px', width: '44px' }} />
              <p style={{ color: 'var(--ink-2)', fontSize: '13px' }}>Todos los dias, cuando el pueblo se queda en silencio.</p>
            </div>
            <h1 style={{ color: 'var(--ink)', fontSize: 'clamp(52px, 6.6vw, 88px)', lineHeight: 0.9 }}>
              Las
              <br />
              Estatuas
              <br />
              Cobran
              <br />
              Vida.
            </h1>
            <p className="editorial-lbl" style={{ color: 'var(--brown)', marginTop: '24px' }}>
              Patrimonio Cultural - Cordoba, Argentina
            </p>
            <p
              style={{
                color: 'var(--ink-2)',
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginTop: '32px',
                maxWidth: '300px',
              }}
            >
              Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.
            </p>
            <Link href="#estatuas" style={{ borderBottom: '1px solid var(--ink)', color: 'var(--ink)', display: 'inline-flex', fontSize: '16px', marginTop: '28px', paddingBottom: '3px' }}>
              Explorar el pueblo
            </Link>
          </div>

          <div className="museum-card-strip">
            {imagenesGaleria.slice(0, 3).map((img, index) => (
              <Link key={`${img.url}-${index}`} href="/galeria" className="museum-paper-card" style={{ display: 'block', padding: '14px' }}>
                <FramedPainting src={img.url} alt={img.titulo} height={132} tone={index % 2 === 0 ? 'sepia' : 'sky'} priority={index === 0} />
                <p className="editorial-lbl" style={{ color: '#8B2020', fontSize: '7px', marginTop: '12px' }}>{img.categoria}</p>
                <h3 style={{ color: '#1C1008', fontSize: '20px', lineHeight: 1.05, marginTop: '5px' }}>{img.titulo}</h3>
              </Link>
            ))}
          </div>

          <Butterfly color="var(--brown)" size={22} style={{ position: 'absolute', right: '28px', top: '110px', zIndex: 4 }} />
        </section>

        <section id="estatuas" className="museum-section">
          <EditorialNum num="01" label="Las Estatuas" />
          <div className="hr-brown" style={{ margin: '12px 0 28px' }} />
          <h2 style={{ color: 'var(--ink)', fontSize: '42px' }}>
            Dos figuras,
            <br />
            dos siglos.
          </h2>
          <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '36px' }}>
            {estatuas.map((estatua, index) => (
              <EstatuaCard key={estatua.id} estatua={estatua} tone={index % 2 === 0 ? 'portrait' : 'ember'} />
            ))}
          </div>
        </section>

        <section className="museum-section museum-section-paper">
          <EditorialNum num="02" label="Galeria Historica" />
          <div className="hr-brown" style={{ background: 'rgba(28,16,8,0.28)', margin: '12px 0 22px' }} />
          <p
            style={{
              color: '#3D2A14',
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: '28px',
              maxWidth: '320px',
            }}
          >
            Imagenes del archivo del pueblo, paisajes serranos y memoria popular.
          </p>
          <div style={{ display: 'grid', gap: '22px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: '28px' }}>
            {imagenesGaleria.slice(0, 6).map((img, index) => (
              <article key={`${img.url}-${index}`}>
                <FramedPainting src={img.url} alt={img.titulo} height={170} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
                <div style={{ paddingTop: '10px' }}>
                  <p className="editorial-lbl" style={{ color: '#8B2020', fontSize: '7px', marginBottom: '4px' }}>
                    {img.categoria}
                  </p>
                  <h3 style={{ color: '#1C1008', fontSize: '18px', lineHeight: 1.15 }}>{img.titulo}</h3>
                </div>
              </article>
            ))}
          </div>
          <Link className="btn-outline-red" href="/galeria" style={{ color: '#8B2020' }}>
            Ver galeria completa <span>-</span>
          </Link>
        </section>

        <section className="museum-section">
          <EditorialNum num="03" label="Lugares para Conocer" />
          <div className="hr-brown" style={{ margin: '12px 0 28px' }} />
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {lugaresCombinados.map((lugar, index) => (
              <LugarRow key={`${lugar.nombre}-${index}`} lugar={lugar} index={index} last={index === lugaresCombinados.length - 1} />
            ))}
          </div>
        </section>

        <footer className="museum-section" style={{ paddingTop: '40px' }}>
          <div className="hr-brown" style={{ background: 'var(--border-dark)', marginBottom: '26px' }} />
          <h2 style={{ color: 'var(--red-light)', fontSize: '34px', marginBottom: '6px' }}>San Lorenzo</h2>
          <p className="editorial-lbl" style={{ color: 'var(--brown)', marginBottom: '28px' }}>
            Patrimonio Cultural Digital - Cordoba
          </p>
          <nav
            style={{
              color: 'var(--ink-3)',
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: '9px',
              gap: '18px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            <Link href="#estatuas">Estatuas</Link>
            <Link href="/galeria">Galeria</Link>
            <Link href="/lugares">Lugares</Link>
          </nav>
          <p
            style={{
              color: 'var(--ink-4)',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontStyle: 'italic',
              lineHeight: 1.7,
              marginTop: '24px',
            }}
          >
            2026 - Una iniciativa del Municipio de San Lorenzo.
          </p>
        </footer>
      </div>
    </main>
  )
}
