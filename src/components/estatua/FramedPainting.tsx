import type { CSSProperties } from 'react'

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

const frameStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #d9bf8a 0%, #b89c64 60%, #8c6b42 100%)',
  border: '0.5px solid #6b4c2a',
  boxShadow:
    '0 1px 2px rgba(60, 40, 20, 0.25), inset 0 0 0 1px rgba(255, 240, 200, 0.35)',
  boxSizing: 'border-box',
  display: 'inline-block',
  padding: '5px',
}

const imageStyle: CSSProperties = {
  display: 'block',
  height: 'auto',
  objectFit: 'cover',
  width: '100%',
}

const placeholderPalettes = {
  sepia:
    'radial-gradient(ellipse at 40% 30%, #a08768 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d2a14 0%, transparent 60%), linear-gradient(160deg, #6b4c2a 0%, #3d2a14 100%)',
  pastoral:
    'radial-gradient(ellipse at 40% 30%, #8b9b6b 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d2a14 0%, transparent 60%), linear-gradient(160deg, #5a6b3f 0%, #3d2a14 100%)',
  portrait:
    'radial-gradient(ellipse at 40% 30%, #b89572 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d2a14 0%, transparent 60%), linear-gradient(160deg, #7a5a3e 0%, #3d2a14 100%)',
  sky:
    'radial-gradient(ellipse at 40% 30%, #9bb0c8 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d4a5c 0%, transparent 60%), linear-gradient(160deg, #6b8094 0%, #3d4a5c 100%)',
  ember:
    'radial-gradient(ellipse at 40% 30%, #b16040 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d1010 0%, transparent 60%), linear-gradient(160deg, #8b3020 0%, #3d1010 100%)',
} as const

const labelStyle: CSSProperties = {
  color: '#3A0F0E',
  display: 'block',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  fontSize: '8px',
  letterSpacing: '0.18em',
  lineHeight: 1.4,
  marginTop: '8px',
  textAlign: 'center',
  textTransform: 'uppercase',
}

export default function FramedPainting({
  src,
  alt,
  width = '100%',
  height,
  tone = 'sepia',
  label = null,
}: FramedPaintingProps) {
  const mediaStyle: CSSProperties = {
    ...imageStyle,
    height,
    width,
  }

  return (
    <div>
      <div style={frameStyle}>
        {src ? (
          <img src={src} alt={alt} style={mediaStyle} />
        ) : (
          <div
            aria-label={alt}
            role="img"
            style={{
              background: placeholderPalettes[tone],
              height: height ?? 180,
              width,
            }}
          />
        )}
      </div>
      {label && <span style={labelStyle}>[ {label} ]</span>}
    </div>
  )
}
