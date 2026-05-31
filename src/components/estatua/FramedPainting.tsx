interface FramedPaintingProps {
  src?: string | null
  alt: string
  width?: number | string
  height?: number | string
  tone?: 'sepia' | 'pastoral' | 'portrait' | 'sky' | 'ember'
  label?: string | null
  priority?: boolean
  fill?: boolean
}

export default function FramedPainting({
  src,
  alt,
  label = null,
}: FramedPaintingProps) {
  return (
    <div>
      {src ? <img src={src} alt={alt} /> : <div aria-label={alt} role="img" />}
      {label && <span>[ {label} ]</span>}
    </div>
  )
}
