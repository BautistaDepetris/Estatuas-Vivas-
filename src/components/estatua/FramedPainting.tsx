import Image from 'next/image'

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

const tones = {
  sepia: ['#a08768', '#6b4c2a', '#3d2a14'],
  pastoral: ['#8b9b6b', '#5a6b3f', '#3d2a14'],
  portrait: ['#b89572', '#7a5a3e', '#3d2a14'],
  sky: ['#9bb0c8', '#6b8094', '#3d4a5c'],
  ember: ['#b16040', '#8b3020', '#3d1010'],
}

export default function FramedPainting({
  src,
  alt,
  width = '100%',
  height = 200,
  tone = 'sepia',
  label = null,
  priority = false,
  fill = false,
}: FramedPaintingProps) {
  const [c1, c2, c3] = tones[tone]
  const boxStyle: React.CSSProperties = {
    height,
    overflow: 'hidden',
    position: 'relative',
    width,
    background: `
      radial-gradient(ellipse at 40% 30%, ${c1} 0%, transparent 55%),
      radial-gradient(ellipse at 70% 70%, ${c3} 0%, transparent 60%),
      linear-gradient(160deg, ${c2} 0%, ${c3} 100%)
    `,
  }

  return (
    <div
      className="frame"
      style={{
        height: typeof height === 'number' ? height + 10 : height,
        width: typeof width === 'number' ? width + 10 : width,
      }}
    >
      <div style={boxStyle}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={fill ? '100vw' : '(max-width: 768px) 90vw, 420px'}
            className="museum-image"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            aria-label={alt}
            role="img"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(rgba(255,235,200,0.06) 1px, transparent 1px),
                radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)
              `,
              backgroundPosition: '0 0, 2px 3px',
              backgroundSize: '5px 5px, 9px 9px',
            }}
          />
        )}
        {label && (
          <span
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '8px',
              color: 'rgba(245,237,216,0.68)',
              fontFamily: 'var(--font-body)',
              fontSize: '7px',
              fontStyle: 'italic',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            [ {label} ]
          </span>
        )}
      </div>
    </div>
  )
}
