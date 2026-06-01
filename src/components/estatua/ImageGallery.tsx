import EstatuaHomeCard from '@/components/EstatuaHomeCard';
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
    return (<section>
      <EditorialNum num="03" label="Vida en Archivos"/>
      <div />
      <h2>Vida en Archivos.</h2>

      <div>
        {imagenes.map((imagen, index) => (<EstatuaHomeCard
            slug={`${nombreEstatua}-${index}`}
            nombre={imagen.titulo || nombreEstatua}
            subtitulo={imagen.categoria}
            descripcion={imagen.descripcion}
            imagenUrl={imagen.url}
            imagenAlt={imagen.titulo || nombreEstatua}
            ctaLabel="Ver archivo"
            href="#"
            key={`${imagen.url}-${index}`}
          />))}
      </div>
    </section>);
}
