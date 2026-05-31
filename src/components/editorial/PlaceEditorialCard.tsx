import type { CSSProperties } from 'react';
import OrnamentalFrame from './OrnamentalFrame';
interface PlaceEditorialCardProps {
    categoria?: string | null;
    descripcion?: string | null;
    imageUrl?: string | null;
    index: number;
    nombre: string;
}
const fontDisplay = "'Playfair Display', Georgia, serif";
const fontBody = "'Inter', system-ui, -apple-system, sans-serif";
const numStyle: CSSProperties = {
    color: '#8B2020',
    fontFamily: fontDisplay,
    fontSize: '18px',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.02em',
};
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
export default function PlaceEditorialCard({ categoria, descripcion, imageUrl, index, nombre }: PlaceEditorialCardProps) {
    return (<article>
      <span style={numStyle}>
        /{String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <div>
          <OrnamentalFrame alt={nombre} aspectRatio="16 / 8.6" src={imageUrl} variant="horizontal"/>
        </div>
        {categoria && (<p style={labelStyle}>
            {categoria}
          </p>)}
        <h3 style={titleStyle}>
          {nombre}
        </h3>
        {descripcion && (<p style={bodyStyle}>{descripcion}</p>)}
      </div>
    </article>);
}
