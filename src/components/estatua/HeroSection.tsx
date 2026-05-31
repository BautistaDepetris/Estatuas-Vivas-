import Link from 'next/link';
import { Estatua } from '@/types';
import Butterfly from './Butterfly';
import HeroLivingVideo from './HeroLivingVideo';
interface HeroSectionProps {
    estatua: Estatua;
}
export default function HeroSection({ estatua }: HeroSectionProps) {
    const imagen = estatua.imagenes[0];
    const partesSubtitulo = estatua.subtitulo.split('·').map((parte) => parte.trim());
    const kicker = partesSubtitulo[0] || estatua.subtitulo;
    const detalle = partesSubtitulo.slice(1).join(' · ');
    const videoSrc = `/videos/${estatua.slug}.mp4`;
    return (<section>
      <div>
        <HeroLivingVideo src={videoSrc} fallbackSrc={imagen?.url} fallbackAlt={imagen?.titulo ?? estatua.nombre}/>
      </div>
      <div />
      <Link aria-label="Volver al inicio" href="/">
        ×
      </Link>
      <Link href="/">
        ← Volver al inicio
      </Link>
      <div>
        <p>
          {kicker}
        </p>
        <h1>
          {estatua.nombre.split(' ').map((part) => (<span key={part}>
              {part}
              <br />
            </span>))}
        </h1>
        <p>
          {detalle || estatua.nombre}
        </p>
      </div>
      <Butterfly />
    </section>);
}
