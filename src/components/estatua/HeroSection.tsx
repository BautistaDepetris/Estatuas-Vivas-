import Link from 'next/link';
import BotonVolver from '@/components/BotonVolver';
import { Estatua } from '@/types';
import Butterfly from './Butterfly';
import HeroLivingVideo from './HeroLivingVideo';

interface HeroSectionProps {
    estatua: Estatua;
}

export default function HeroSection({ estatua }: HeroSectionProps) {
    const imagen = estatua.imagenes[0];
    const partesSubtitulo = estatua.subtitulo.split('Â·').map((parte) => parte.trim());
    const kicker = partesSubtitulo[0] || estatua.subtitulo;
    const detalle = partesSubtitulo.slice(1).join(' Â· ');
    const videoSrc = `/videos/${estatua.slug}.mp4`;
    return (<section>
      <div>
        <HeroLivingVideo src={videoSrc} fallbackSrc={imagen?.url} fallbackAlt={imagen?.titulo ?? estatua.nombre}/>
      </div>
      <div />
      <Link aria-label="Volver al inicio" href="/">
        Ã—
      </Link>
      <BotonVolver variant="solid" label="Volver al inicio" href="/" />
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
