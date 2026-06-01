import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudioTracks } from '@/components/BotonesAudio';
import AudioPlayer from '@/components/estatua/AudioPlayer';
import HeroSection from '@/components/estatua/HeroSection';
import ImageGallery from '@/components/estatua/ImageGallery';
import NextStatuaButton from '@/components/estatua/NextStatuaButton';
import QuoteCard from '@/components/estatua/QuoteCard';
import LugarRow from '@/components/estatua/LugarRow';
import { getEstatua, getSiguienteEstatuaPublica } from '@/lib/supabase/queries';
import VisitaTracker from './VisitaTracker';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const romanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const audioTracks = [
  'El Santo cuenta su historia',
  'Historia del pueblo',
  'Los fundadores',
];

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const estatua = await getEstatua(slug);

  if (!estatua) return { title: 'Estatua no encontrada' };

  return {
    title: `${estatua.nombre} - San Lorenzo`,
    description: estatua.subtitulo,
    openGraph: {
      title: estatua.nombre,
      description: estatua.frase,
      images: estatua.imagenes?.[0]?.url ? [estatua.imagenes[0].url] : [],
    },
  };
}

export default async function EstatuaPage({ params }: PageProps) {
  const { slug } = await params;
  const estatua = await getEstatua(slug);

  if (!estatua) notFound();

  const siguiente = await getSiguienteEstatuaPublica(slug);

  return (
    <main className="landing-background page-shell">
      <VisitaTracker slug={slug} />
      <HeroSection estatua={estatua} />

      <section className="museum-section">
        <div className="museum-inner">
          <div className="museum-header">
            <span className="museum-kicker">/01</span>
            <span className="museum-header-line" />
            <span className="museum-label">Audios</span>
          </div>
          <h2 className="museum-title">
            La historia
            <br />
            narrada.
          </h2>
          <div className="audio-vitrine">
            <AudioTracks
              tracks={audioTracks.map((track) => ({
                titulo: track,
                sub: `Placeholder de audio para ${estatua.nombre}. El track final se conectara cuando este disponible.`,
                duracion: '02:14',
              }))}
            />
          </div>
        </div>
      </section>

      <section className="museum-section">
        <div className="museum-inner">
          <div className="museum-header">
            <span className="museum-kicker">/02</span>
            <span className="museum-header-line" />
            <span className="museum-label">Capitulos Escritos</span>
          </div>
          <h2 className="museum-title">
            Siete capitulos
            <br />
            de una vida.
          </h2>
          <div className="horizontal-rail">
            {estatua.capitulos.map((capitulo, index) => (
              <article className="chapter-card" key={`${capitulo.titulo}-${index}`}>
                <span className="chapter-card__num">
                  /{romanos[index] ?? index + 1}
                </span>
                <h3>{capitulo.titulo}</h3>
                <p>{capitulo.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <QuoteCard frase={estatua.frase} autor={estatua.nombre} />
      <ImageGallery imagenes={estatua.imagenes} nombreEstatua={estatua.nombre} />

      <section className="museum-section">
        <div className="museum-inner">
          <div className="museum-header">
            <span className="museum-kicker">/04</span>
            <span className="museum-header-line" />
            <span className="museum-label">El Pueblo Recomienda</span>
          </div>
          <p className="museum-lede">
            &quot;Si queres conocer mis pasos, te dejo estos lugares -&quot;
          </p>
          {estatua.lugares.length ? (
            <div className="compact-list">
              {estatua.lugares.map((lugar, index) => (
                <LugarRow
                  key={`${lugar.nombre}-${index}`}
                  lugar={lugar}
                  index={index}
                  last={index === estatua.lugares.length - 1}
                />
              ))}
            </div>
          ) : (
            <p>Aun no tenemos lugares recomendados para esta estatua.</p>
          )}
        </div>
      </section>

      {siguiente && <NextStatuaButton siguiente={siguiente} />}
      <AudioPlayer audioUrl={estatua.audio_url} nombreEstatua={estatua.nombre} />
    </main>
  );
}
