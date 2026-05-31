import EditorialImageCard from './EditorialImageCard';
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
      {items.map((item, index) => (<EditorialImageCard
          alt={item.titulo}
          descripcion={item.descripcion}
          imageHeight={200}
          imageUrl={item.url}
          key={item.id ?? `${item.url}-${index}`}
          kicker={item.categoria}
          titulo={item.titulo}
        />))}
    </div>);
}
