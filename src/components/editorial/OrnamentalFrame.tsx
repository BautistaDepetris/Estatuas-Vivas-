type OrnamentalFrameVariant = 'full' | 'sides' | 'horizontal'

interface OrnamentalFrameProps {
  alt: string
  aspectRatio?: string
  className?: string
  src?: string | null
  variant?: OrnamentalFrameVariant
}

const frameAssets: Record<OrnamentalFrameVariant, string> = {
  full: '/assets/cuadro%204%20laterales.png',
  horizontal: '/assets/cuadro-superior-inferior-alpha.png',
  sides: '/assets/cuadro-solo-lateral-alpha.png',
}

const imageInset: Record<OrnamentalFrameVariant, string> = {
  full: '10% 9% 11%',
  horizontal: '11% 4% 12%',
  sides: '4% 8%',
}

function FrameLayer({ asset, variant }: { asset: string; variant: OrnamentalFrameVariant }) {
  if (variant === 'sides') {
    return (
      <>
        <img aria-hidden="true" className="ornamental-frame__asset ornamental-frame__asset--left" src={asset} alt="" />
        <img aria-hidden="true" className="ornamental-frame__asset ornamental-frame__asset--right" src={asset} alt="" />
      </>
    )
  }

  if (variant === 'horizontal') {
    return (
      <>
        <img aria-hidden="true" className="ornamental-frame__asset ornamental-frame__asset--top" src={asset} alt="" />
        <img aria-hidden="true" className="ornamental-frame__asset ornamental-frame__asset--bottom" src={asset} alt="" />
      </>
    )
  }

  return <img aria-hidden="true" className="ornamental-frame__asset ornamental-frame__asset--full" src={asset} alt="" />
}

export default function OrnamentalFrame({
  alt,
  aspectRatio = '16 / 10',
  className,
  src,
  variant = 'full',
}: OrnamentalFrameProps) {
  const asset = frameAssets[variant]
  const classes = ['ornamental-frame', `ornamental-frame--${variant}`, className].filter(Boolean).join(' ')

  return (
    <figure className={classes} style={{ aspectRatio }}>
      <div className="ornamental-frame__photo" style={{ inset: imageInset[variant] }}>
        {src ? <img src={src} alt={alt} /> : <span aria-hidden="true" />}
      </div>
      <FrameLayer asset={asset} variant={variant} />
    </figure>
  )
}
