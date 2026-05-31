import Link from 'next/link';
import { Estatua } from '@/types';
import FramedPainting from './FramedPainting';
interface NextStatuaButtonProps {
    siguiente: Estatua;
}
export default function NextStatuaButton({ siguiente }: NextStatuaButtonProps) {
    const imagen = siguiente.imagenes[0];
    return (<Link href={`/estatuas/${siguiente.slug}`}>
      <section>
        <div>
          <FramedPainting src={imagen?.url} alt={imagen?.titulo ?? siguiente.nombre} height="100%" tone="ember" fill/>
        </div>
        <div />
        <div>
          <p>
            Continua el recorrido
          </p>
          <div>
            <h2>{siguiente.nombre}</h2>
            <span>→</span>
          </div>
          <p>
            Siguiente punto del recorrido
          </p>
        </div>
      </section>
    </Link>);
}
