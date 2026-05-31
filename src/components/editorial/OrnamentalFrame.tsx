type OrnamentalFrameVariant = 'full' | 'sides' | 'horizontal'

interface OrnamentalFrameProps {
  alt: string
  aspectRatio?: string
  className?: string
  src?: string | null
  variant?: OrnamentalFrameVariant
}

export default function OrnamentalFrame({ alt, src }: OrnamentalFrameProps) {
  return <figure>{src ? <img src={src} alt={alt} /> : <span aria-hidden="true" />}</figure>
}
