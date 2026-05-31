import OrnamentalFrame from './OrnamentalFrame';
interface PlaceEditorialCardProps {
    categoria?: string | null;
    descripcion?: string | null;
    imageUrl?: string | null;
    index: number;
    nombre: string;
}
export default function PlaceEditorialCard({ categoria, descripcion, imageUrl, index, nombre }: PlaceEditorialCardProps) {
    return (<article>
      <span>
        /{String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <div>
          <OrnamentalFrame alt={nombre} aspectRatio="16 / 8.6" src={imageUrl} variant="horizontal"/>
        </div>
        {categoria && (<p>
            {categoria}
          </p>)}
        <h3>
          {nombre}
        </h3>
        {descripcion && (<p>{descripcion}</p>)}
      </div>
    </article>);
}
