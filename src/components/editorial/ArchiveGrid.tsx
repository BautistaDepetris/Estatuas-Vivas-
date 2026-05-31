import type { CSSProperties } from 'react';
import OrnamentalFrame from './OrnamentalFrame';
interface ArchiveGridItem {
    categoria?: string | null;
    descripcion?: string | null;
    id?: string;
    titulo: string;
    url?: string | null;
}
interface ArchiveGridProps {
    items: ArchiveGridItem[];
}
const fontDisplay = "'Playfair Display', Georgia, serif";
const fontBody = "'Inter', system-ui, -apple-system, sans-serif";
const labelStyle: CSSProperties = {
    color: '#6B4C2A',
    fontFamily: fontBody,
    fontSize: '9px',
    fontWeight: 500,
    letterSpacing: '0.28em',
    lineHeight: 1.4,
    textTransform: 'uppercase',
};
const titleStyle: CSSProperties = {
    color: '#3D2A14',
    fontFamily: fontDisplay,
    fontSize: '24px',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: 1,
};
const bodyStyle: CSSProperties = {
    color: '#6B4C2A',
    fontFamily: fontBody,
    fontSize: '13px',
    fontWeight: 400,
    lineHeight: 1.7,
};
export default function ArchiveGrid({ items }: ArchiveGridProps) {
    if (!items.length)
        return null;
    return (<div>
      {items.map((item, index) => (<article key={item.id ?? `${item.url}-${index}`}>
          <OrnamentalFrame alt={item.titulo} aspectRatio={index % 3 === 0 ? '4 / 3.35' : '4 / 2.9'} src={item.url} variant="horizontal"/>
          <div>
            {item.categoria && (<p style={labelStyle}>
                {item.categoria}
              </p>)}
            <h3 style={titleStyle}>
              {item.titulo}
            </h3>
            {item.descripcion && (<p style={bodyStyle}>{item.descripcion}</p>)}
          </div>
        </article>))}
    </div>);
}
