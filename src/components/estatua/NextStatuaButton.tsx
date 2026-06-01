import Link from 'next/link';
import { Estatua } from '@/types';
import FramedPainting from './FramedPainting';

interface NextStatuaButtonProps {
  siguiente: Estatua;
}

export default function NextStatuaButton({ siguiente }: NextStatuaButtonProps) {
  const imagen = siguiente.imagenes[0];

  return (
    <section className="museum-section">
      <div className="museum-inner">
        <div className="museum-header">
          <span className="museum-kicker">/05</span>
          <span className="museum-header-line" />
          <span className="museum-label">Continua el recorrido</span>
        </div>
        <Link className="next-statue-card" href={`/estatuas/${siguiente.slug}`}>
          <div className="next-statue-card__media">
            <FramedPainting
              src={imagen?.url}
              alt={imagen?.titulo ?? siguiente.nombre}
              height="100%"
              tone="ember"
              fill
            />
          </div>
          <div className="next-statue-card__body">
            <span className="label c-red">Siguiente estatua</span>
            <h2>{siguiente.nombre}</h2>
            <p>Siguiente punto del recorrido</p>
            <span className="next-statue-card__cta">
              Ver mas <span aria-hidden="true">-&gt;</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
