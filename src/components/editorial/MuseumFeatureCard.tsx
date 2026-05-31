import EditorialImageCard from './EditorialImageCard'

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
    <EditorialImageCard
      alt={titulo}
      ctaLabel={actionHref ? actionLabel : undefined}
      descripcion={descripcion}
      href={actionHref}
      imageHeight={frameVariant === 'full' ? 200 : 140}
      imageUrl={imageUrl}
      kicker={categoria}
      titulo={titulo}
    />
  )
}
