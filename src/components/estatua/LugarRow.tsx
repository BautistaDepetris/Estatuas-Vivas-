import EstatuaHomeCard from '@/components/EstatuaHomeCard'
import { Lugar } from '@/types'

interface LugarRowProps {
  lugar: Lugar & {
    estatuaNombre?: string
  }
  index: number
  href?: string
  last?: boolean
}

export default function LugarRow({
  lugar,
  index,
  href = '/lugares',
}: LugarRowProps) {
  return (
    <EstatuaHomeCard
      slug={`${lugar.nombre}-${index}`}
      nombre={lugar.nombre}
      subtitulo={lugar.categoria}
      descripcion={lugar.descripcion}
      imagenUrl={lugar.imagen_url ?? undefined}
      imagenAlt={lugar.nombre}
      ctaLabel="Ver mas"
      href={href}
    />
  )
}
