import type { CSSProperties } from 'react'

type OrnamentalFrameVariant = 'full' | 'sides' | 'horizontal'

interface OrnamentalFrameProps {
  alt: string
  aspectRatio?: string
  className?: string
  src?: string | null
  variant?: OrnamentalFrameVariant
}

const frameStyle: CSSProperties = {
  background: 'linear-gradient(135deg, #d9bf8a 0%, #b89c64 60%, #8c6b42 100%)',
  border: '0.5px solid #6b4c2a',
  boxShadow:
    '0 1px 2px rgba(60, 40, 20, 0.25), inset 0 0 0 1px rgba(255, 240, 200, 0.35)',
  boxSizing: 'border-box',
  margin: 0,
  padding: '5px',
}

const imageStyle: CSSProperties = {
  aspectRatio: '4 / 3',
  display: 'block',
  height: 'auto',
  objectFit: 'cover',
  width: '100%',
}

const placeholderStyle: CSSProperties = {
  aspectRatio: '4 / 3',
  background:
    'radial-gradient(ellipse at 40% 30%, #b89572 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #3d2a14 0%, transparent 60%), linear-gradient(160deg, #7a5a3e 0%, #3d2a14 100%)',
  display: 'block',
  width: '100%',
}

export default function OrnamentalFrame({
  alt,
  aspectRatio,
  src,
}: OrnamentalFrameProps) {
  return (
    <figure style={frameStyle}>
      {src ? (
        <img src={src} alt={alt} style={{ ...imageStyle, aspectRatio }} />
      ) : (
        <span aria-hidden="true" style={{ ...placeholderStyle, aspectRatio }} />
      )}
    </figure>
  )
}
