import EditorialImageCard from './EditorialImageCard';
interface PlaceEditorialCardProps {
    categoria?: string | null;
    descripcion?: string | null;
    imageUrl?: string | null;
    index: number;
    nombre: string;
}
export default function PlaceEditorialCard({ categoria, descripcion, imageUrl, index, nombre }: PlaceEditorialCardProps) {
    return (<EditorialImageCard
      alt={nombre}
      descripcion={descripcion}
      imageHeight={200}
      imageUrl={imageUrl}
      kicker={categoria ?? `/${String(index + 1).padStart(2, '0')}`}
      titulo={nombre}
    />);
}
