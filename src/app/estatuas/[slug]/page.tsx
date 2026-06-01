import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudioTracks } from '@/components/BotonesAudio';
import AudioPlayer from '@/components/estatua/AudioPlayer';
import EditorialNum from '@/components/estatua/EditorialNum';
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
    if (!estatua)
        return { title: 'Estatua no encontrada' };
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
    if (!estatua)
        notFound();
    const siguiente = await getSiguienteEstatuaPublica(slug);
    return (<main className="landing-background">
      <VisitaTracker slug={slug}/>
      <HeroSection estatua={estatua}/>

      <section>
        <EditorialNum num="01" label="Audios"/>
        <div />
        <h2>
          La historia
          <br />
          narrada.
        </h2>
        <AudioTracks
          tracks={audioTracks.map((track) => ({
            titulo: track,
            sub: `Placeholder de audio para ${estatua.nombre}. El track final se conectará cuando esté disponible.`,
            duracion: '02:14',
          }))}
        />
      </section>

      <section>
        <div>
          <EditorialNum num="02" label="Capítulos Escritos"/>
          <div />
          <h2>
            Siete capítulos
            <br />
            de una vida.
          </h2>
        </div>
        <div>
          {estatua.capitulos.map((capitulo, index) => (<article key={`${capitulo.titulo}-${index}`}>
              <span>
                /{romanos[index] ?? index + 1}
              </span>
              <h3>{capitulo.titulo}</h3>
              <p>{capitulo.texto}</p>
            </article>))}
        </div>
        <div>
          {estatua.capitulos.map((_, index) => (<span key={index}/>))}
        </div>
      </section>

      <QuoteCard frase={estatua.frase} autor={estatua.nombre}/>
      <ImageGallery imagenes={estatua.imagenes} nombreEstatua={estatua.nombre}/>

      <section>
        <EditorialNum num="04" label="El Pueblo Recomienda"/>
        <div />
        <p>
          &quot;Si queres conocer mis pasos, te dejo estos lugares -&quot;
        </p>
        {estatua.lugares.length ? (<div>
            {estatua.lugares.map((lugar, index) => (<LugarRow key={`${lugar.nombre}-${index}`} lugar={lugar} index={index} last={index === estatua.lugares.length - 1}/>))}
          </div>) : (<p>
            Aún no tenemos lugares recomendados para esta estatua.
          </p>)}
      </section>

      {siguiente && <NextStatuaButton siguiente={siguiente}/>}
      <AudioPlayer audioUrl={estatua.audio_url} nombreEstatua={estatua.nombre}/>
    </main>);
}
