import Link from 'next/link'
import OrnamentalFrame from './OrnamentalFrame'

interface MuseumFeatureCardProps {
  actionHref?: string
  actionLabel?: string
  categoria?: string | null
  descripcion?: string | null
  frameVariant?: 'full' | 'sides' | 'horizontal'
  imageUrl?: string | null
  titulo: string
}

export default function MuseumFeatureCard({
  actionHref,
  actionLabel = 'Ver mas',
  categoria,
  descripcion,
  frameVariant = 'full',
  imageUrl,
  titulo,
}: MuseumFeatureCardProps) {
  return (
    <article>
      <OrnamentalFrame alt={titulo} src={imageUrl} variant={frameVariant} />
      <div>
        {categoria && <p>{categoria}</p>}
        <h3>{titulo}</h3>
        {descripcion && <p>{descripcion}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref}>
          <span>{actionLabel}</span>
          <span aria-hidden="true">-&gt;</span>
        </Link>
      )}
    </article>
  )
}
