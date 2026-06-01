import React from 'react';
import Link from 'next/link';
import './BotonVolver.css';

/**
 * BotonVolver — Botones "Volver atrás" del sistema "San Lorenzo".
 * 8 variantes fieles al diseño (1 componente con prop `variant`).
 *
 * Estados: hover (la flecha se desplaza a la izquierda), active en los sólidos.
 *
 * Si se pasa `href` renderiza <Link> (next/link); si no, <button> con onClick.
 */
export type BotonVolverVariant =
  | 'ghost'        // texto + flecha sobre negro (crema)
  | 'ghost-dark'   // ghost sobre papel (marrón)
  | 'solid'        // barra bordó sólida
  | 'outline'      // contorno con filete dorado
  | 'round'        // circular ícono (filete dorado) · hit ≥44px
  | 'round-solid'  // circular bordó sólido
  | 'crumb'        // migaja contextual: "Volver a <b>…</b>"
  | 'bar';         // barra de detalle full-width (back + título)

export interface BotonVolverProps {
  /** Variante visual. Default "solid". */
  variant?: BotonVolverVariant;
  /** Texto del botón. Default "Volver". No aplica a `round`/`round-solid` (icono solo). */
  label?: string;
  /** Destino del enlace. Si se pasa, usa <Link>; si no, <button>. No se inventan rutas. */
  href?: string;
  /** Handler de click (cuando no hay `href`). */
  onClick?: () => void;
  /** Solo `crumb`: parte resaltada — "Volver a <b>{contexto}</b>". */
  contexto?: string;
  /** Solo `bar`: título centrado del header. */
  titulo?: string;
  /** Clases extra opcionales. */
  className?: string;
}

interface ClickableProps {
  href?: string;
  onClick?: () => void;
  className: string;
  ariaLabel?: string;
  children: React.ReactNode;
}
function Clickable({ href, onClick, className, ariaLabel, children }: ClickableProps) {
  if (href) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}

export default function BotonVolver({
  variant = 'solid',
  label = 'Volver',
  href,
  onClick,
  contexto = '',
  titulo = '',
  className = '',
}: BotonVolverProps) {
  // 06 · Barra de detalle (header full-width)
  if (variant === 'bar') {
    return (
      <div className="topbar">
        <Clickable href={href} onClick={onClick} className="back">
          <span className="arw">←</span>
          <span className="lbl">{label}</span>
        </Clickable>
        <span className="ttl">{titulo}</span>
        <span className="sp" />
      </div>
    );
  }

  // 05 · Migaja contextual
  if (variant === 'crumb') {
    return (
      <Clickable href={href} onClick={onClick} className="b-crumb">
        <span className="arw">←</span>
        <span className="ctx">
          {label} <b>{contexto}</b>
        </span>
      </Clickable>
    );
  }

  // 04 · Circular (icono solo)
  if (variant === 'round' || variant === 'round-solid') {
    const cls = variant === 'round-solid' ? 'b-round solid' : 'b-round';
    return (
      <Clickable href={href} onClick={onClick} className={cls} ariaLabel={label}>
        <span className="arw">←</span>
      </Clickable>
    );
  }

  // 01/02/03/07 · ghost / ghost-dark / solid / outline
  const base =
    variant === 'ghost' ? 'b-ghost'
    : variant === 'ghost-dark' ? 'b-ghost dark'
    : variant === 'outline' ? 'b-outline'
    : 'b-solid';

  return (
    <Clickable href={href} onClick={onClick} className={`${base} ${className}`.trim()}>
      <span className="arw">←</span>
      <span className="lbl">{label}</span>
    </Clickable>
  );
}
