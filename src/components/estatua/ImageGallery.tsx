import ArchiveGrid from '@/components/editorial/ArchiveGrid';
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard';
import { EstatuaImagen } from '@/types';
import EditorialNum from './EditorialNum';
interface ImageGalleryProps {
    imagenes: EstatuaImagen[];
    nombreEstatua: string;
}
export default function ImageGallery({ imagenes, nombreEstatua }: ImageGalleryProps) {
    if (!imagenes.length) {
        return (<section>
        <EditorialNum num="03" label="Vida en Archivos"/>
        <div />
        <p>
          Aun no tenemos imagenes para esta estatua.
        </p>
      </section>);
    }
    const [principal, ...archivo] = imagenes;
    return (<section>
      <EditorialNum num="03" label="Vida en Archivos"/>
      <div />
      <h2>Vida en Archivos.</h2>

      <div>
        <MuseumFeatureCard categoria={principal.categoria} descripcion={principal.descripcion} frameVariant="full" imageUrl={principal.url} titulo={principal.titulo || nombreEstatua}/>
        <ArchiveGrid items={archivo.map((imagen, index) => ({ ...imagen, id: `${imagen.url}-${index}` }))}/>
      </div>
    </section>);
}
