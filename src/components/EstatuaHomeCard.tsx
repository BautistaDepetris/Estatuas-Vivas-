import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './EstatuaHomeCard.css';

/**
 * EstatuaHomeCard
 * Card de Galería del Home — sistema "San Lorenzo" (versión fiel al diseño).
 *
 * Estructura:
 *  - `.frame`: pintura (<Image>) detrás; encima el marco lateral ornamentado
 *    (`frame-lr.png`) + dos líneas doradas finas arriba/abajo. Fondo negro.
 *  - `.body`: textura `paper.png` + categoría bordó, título Playfair italic y
 *    descripción.
 *  - `.btn`: barra full-width bordó con flecha →.
 *  - Borde exterior: 6px solid #1C1008, sin border-radius.
 *
 * Mapeo de campos:
 *  - subtitulo  -> .cat   (categoría/eyebrow, bordó, mayúsculas)
 *  - nombre     -> .title (Playfair Display italic)
 *  - descripcion-> .desc
 *  - imagenUrl  -> <Image> dentro de `.frame .art`; si está vacío, placeholder
 */
export interface EstatuaHomeCardProps {
  /** Identificador único. Construye el href del CTA (`/${slug}`) si no se pasa `href`. */
  slug: string;
  /** Título principal (Playfair Display italic). */
  nombre: string;
  /** Categoría/eyebrow sobre el título (bordó, mayúsculas). */
  subtitulo: string;
  /** Párrafo descriptivo. */
  descripcion: string;
  /** URL de la pintura dentro del marco. Si se omite, se muestra un placeholder. */
  imagenUrl?: string;
  /** Texto alternativo de la imagen. Requerido cuando hay imagen. */
  imagenAlt?: string;
  /** Color de fondo del placeholder cuando no hay imagen. Default: tono oscuro. */
  tone?: string;
  /** Texto del CTA. Definido explícitamente; default "Ver más". */
  ctaLabel?: string;
  /** Destino del CTA. Si se omite, usa `/${slug}`. No se inventan otras rutas. */
  href?: string;
}

export default function EstatuaHomeCard({
  slug,
  nombre,
  subtitulo,
  descripcion,
  imagenUrl,
  imagenAlt = '',
  tone = '#15100a',
  ctaLabel = 'Ver más',
  href,
}: EstatuaHomeCardProps) {
  const destino = href ?? `/${slug}`;

  return (
    <article className="card">
      <div className="frame">
        <div className="art" style={imagenUrl ? undefined : { backgroundColor: tone }}>
          {imagenUrl && (
            <Image
              src={imagenUrl}
              alt={imagenAlt}
              fill
              sizes="280px"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <span className="gline top" />
        <span className="gline bot" />
        {/* Marco lateral ornamentado (centro transparente) */}
        <img className="layer" src="/assets/frame-lr.png" alt="" />
      </div>

      <div className="body">
        <div className="cat">{subtitulo}</div>
        <h3 className="title">{nombre}</h3>
        <p className="desc">{descripcion}</p>
      </div>

      <Link className="btn" href={destino}>
        {ctaLabel} <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
