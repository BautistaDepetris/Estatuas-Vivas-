import Link from 'next/link';
import { Lugar } from '@/types';
import FramedPainting from './FramedPainting';
interface LugarRowProps {
    lugar: Lugar & {
        estatuaNombre?: string;
    };
    index: number;
    href?: string;
    last?: boolean;
}
const tones = ['sepia', 'ember', 'sky', 'pastoral'] as const;
export default function LugarRow({ lugar, index, href = '/lugares', last = false }: LugarRowProps) {
    const content = (<div>
      <div>
        <FramedPainting src={lugar.imagen_url} alt={lugar.nombre} width={62} height={62} tone={tones[index % tones.length]}/>
      </div>
      <div>
        <p>
          {lugar.categoria}
        </p>
        <h3>
          {lugar.nombre}
        </h3>
        <p>
          {lugar.descripcion}
        </p>
      </div>
      <span>→</span>
    </div>);
    return href ? <Link href={href}>{content}</Link> : content;
}
