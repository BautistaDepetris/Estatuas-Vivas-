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
export default function ArchiveGrid({ items }: ArchiveGridProps) {
    if (!items.length)
        return null;
    return (<div>
      {items.map((item, index) => (<article key={item.id ?? `${item.url}-${index}`}>
          <OrnamentalFrame alt={item.titulo} aspectRatio={index % 3 === 0 ? '4 / 3.35' : '4 / 2.9'} src={item.url} variant="horizontal"/>
          <div>
            {item.categoria && (<p>
                {item.categoria}
              </p>)}
            <h3>
              {item.titulo}
            </h3>
            {item.descripcion && (<p>{item.descripcion}</p>)}
          </div>
        </article>))}
    </div>);
}
