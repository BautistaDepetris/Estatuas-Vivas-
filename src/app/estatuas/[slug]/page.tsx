import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AudioPlayer from '@/components/estatua/AudioPlayer'
import AudioTrackCard from '@/components/estatua/AudioTrackCard'
import EditorialNum from '@/components/estatua/EditorialNum'
import HeroSection from '@/components/estatua/HeroSection'
import ImageGallery from '@/components/estatua/ImageGallery'
import NextStatuaButton from '@/components/estatua/NextStatuaButton'
import QuoteCard from '@/components/estatua/QuoteCard'
import LugarRow from '@/components/estatua/LugarRow'
import { getEstatua, getSiguienteEstatuaPublica } from '@/lib/supabase/queries'
import VisitaTracker from './VisitaTracker'

interface PageProps {
  params: Promise<{ slug: string }>
}

const romanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const audioTracks = [
  'El Santo cuenta su historia',
  'Historia del pueblo',
  'Los fundadores',
]

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const estatua = await getEstatua(slug)
  if (!estatua) return { title: 'Estatua no encontrada' }

  return {
    title: `${estatua.nombre} - San Lorenzo`,
    description: estatua.subtitulo,
    openGraph: {
      title: estatua.nombre,
      description: estatua.frase,
      images: estatua.imagenes?.[0]?.url ? [estatua.imagenes[0].url] : [],
    },
  }
}

export default async function EstatuaPage({ params }: PageProps) {
  const { slug } = await params
  const estatua = await getEstatua(slug)

  if (!estatua) notFound()

  const siguiente = await getSiguienteEstatuaPublica(slug)

  return (
    <main className="paper-bg" style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh', paddingBottom: '64px' }}>
      <VisitaTracker slug={slug} />
      <HeroSection estatua={estatua} />

      <section className="paper-bg" style={{ backgroundColor: 'var(--bg)', padding: '56px 26px 48px' }}>
        <EditorialNum num="01" label="Audios" />
        <div className="hr-brown" style={{ margin: '12px 0 24px' }} />
        <h2 style={{ fontSize: '30px', marginBottom: '28px' }}>
          La historia
          <br />
          narrada.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {audioTracks.map((track, index) => (
            <AudioTrackCard
              key={track}
              titulo={track}
              descripcion={`Placeholder de audio para ${estatua.nombre}. El track final se conectará cuando esté disponible.`}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="paper-bg" style={{ backgroundColor: 'var(--bg)', padding: '56px 0 48px' }}>
        <div style={{ padding: '0 26px' }}>
          <EditorialNum num="02" label="Capítulos Escritos" />
          <div className="hr-brown" style={{ margin: '12px 0 24px' }} />
          <h2 style={{ fontSize: '30px' }}>
            Siete capítulos
            <br />
            de una vida.
          </h2>
        </div>
        <div className="scroll-x" style={{ display: 'flex', gap: '14px', overflowX: 'auto', padding: '32px 26px 0' }}>
          {estatua.capitulos.map((capitulo, index) => (
            <article
              key={`${capitulo.titulo}-${index}`}
              style={{
                background: 'var(--bg-2)',
                border: '0.5px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                gap: '12px',
                maxWidth: '240px',
                minWidth: '240px',
                padding: '22px 22px 24px',
              }}
            >
              <span style={{ color: 'var(--red)', fontFamily: 'var(--font-display)', fontSize: '14px', fontStyle: 'italic' }}>
                /{romanos[index] ?? index + 1}
              </span>
              <h3 style={{ fontSize: '18px', lineHeight: 1.15 }}>{capitulo.titulo}</h3>
              <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.75 }}>{capitulo.texto}</p>
            </article>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '24px' }}>
          {estatua.capitulos.map((_, index) => (
            <span
              key={index}
              style={{
                background: index === 0 ? 'var(--red)' : 'var(--border)',
                height: '1.5px',
                width: index === 0 ? '16px' : '4px',
              }}
            />
          ))}
        </div>
      </section>

      <QuoteCard frase={estatua.frase} autor={estatua.nombre} />
      <ImageGallery imagenes={estatua.imagenes} nombreEstatua={estatua.nombre} />

      <section style={{ background: 'var(--bg-2)', padding: '56px 26px 48px', position: 'relative' }}>
        <EditorialNum num="04" label="El Pueblo Recomienda" />
        <div className="hr-brown" style={{ background: 'var(--border-dark)', margin: '12px 0 22px' }} />
        <p
          style={{
            color: 'var(--ink-2)',
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontStyle: 'italic',
            lineHeight: 1.4,
            marginBottom: '28px',
            maxWidth: '280px',
          }}
        >
          &quot;Si queres conocer mis pasos, te dejo estos lugares -&quot;
        </p>
        {estatua.lugares.length ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {estatua.lugares.map((lugar, index) => (
              <LugarRow key={`${lugar.nombre}-${index}`} lugar={lugar} index={index} last={index === estatua.lugares.length - 1} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic' }}>
            Aún no tenemos lugares recomendados para esta estatua.
          </p>
        )}
      </section>

      {siguiente && <NextStatuaButton siguiente={siguiente} />}
      <AudioPlayer audioUrl={estatua.audio_url} nombreEstatua={estatua.nombre} />
    </main>
  )
}
