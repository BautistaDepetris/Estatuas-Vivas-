import Link from 'next/link';
import { Lugar } from '@/types';

interface LugarRowProps {
  lugar: Lugar & {
    estatuaNombre?: string;
  };
  index: number;
  href?: string;
  last?: boolean;
}

const tones = ['#15100a', '#3A0F0E', '#3D2B1F', '#1C1008'];

export default function LugarRow({
  lugar,
  index,
  href = '/lugares',
}: LugarRowProps) {
  const content = (
    <div className="compact-place-row">
      <div className="compact-place-row__thumb">
        <div className="frame">
          {lugar.imagen_url ? (
            <img src={lugar.imagen_url} alt={lugar.nombre} />
          ) : (
            <span
              aria-label={lugar.nombre}
              className="compact-place-row__placeholder"
              role="img"
              style={{ backgroundColor: tones[index % tones.length] }}
            />
          )}
        </div>
      </div>
      <div className="compact-place-row__body">
        <span className="label c-red">{lugar.categoria}</span>
        <h3>{lugar.nombre}</h3>
        <p>{lugar.descripcion}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
