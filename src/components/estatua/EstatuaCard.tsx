import Link from 'next/link';
import { Estatua } from '@/types';
import FramedPainting from './FramedPainting';
interface EstatuaCardProps {
    estatua: Estatua;
    tone?: 'portrait' | 'ember';
}
export default function EstatuaCard({ estatua, tone = 'portrait' }: EstatuaCardProps) {
    const imagen = estatua.imagenes[0];
    const kicker = estatua.subtitulo.split('·')[0]?.trim() || estatua.subtitulo;
    const descripcion = estatua.slug === 'cura-brochero'
        ? 'Recorrió las sierras cordobesas a mula, llevando fe y escuela a los más olvidados de la tierra.'
        : estatua.capitulos[0]?.texto ?? estatua.frase;
    return (<Link href={`/estatuas/${estatua.slug}`}>
      <article>
        <FramedPainting src={imagen?.url} alt={imagen?.titulo ?? estatua.nombre} height={240} tone={tone} label={`${estatua.nombre} · archivo`}/>
        <div>
          <p>
            {kicker}
          </p>
          <h3>
            {estatua.nombre}
          </h3>
          <p>
            {descripcion}
          </p>
          <span>
            Descubrir <span>→</span>
          </span>
        </div>
      </article>
    </Link>);
}
