import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { EstatuaImagen } from '@/types';
interface ImageGalleryProps {
    imagenes: EstatuaImagen[];
    nombreEstatua: string;
}
export default function ImageGallery({ imagenes, nombreEstatua }: ImageGalleryProps) {
    if (!imagenes.length) {
        return (<section className="museum-section">
        <div className="museum-inner">
          <div className="museum-header">
            <span className="museum-kicker">/03</span>
            <span className="museum-header-line" />
            <span className="museum-label">Vida en Archivos</span>
          </div>
          <p>Aun no tenemos imagenes para esta estatua.</p>
        </div>
      </section>);
    }
    return (<section className="museum-section">
      <div className="museum-inner">
        <div className="museum-header">
          <span className="museum-kicker">/03</span>
          <span className="museum-header-line" />
          <span className="museum-label">Vida en Archivos</span>
        </div>
        <h2 className="museum-title">Vida en Archivos.</h2>

        <div className="horizontal-rail">
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
      </div>
    </section>);
}
