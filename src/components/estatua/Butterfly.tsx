interface ButterflyProps {
  size?: number
  color?: string
  style?: React.CSSProperties
}

export default function Butterfly({ size = 18, color = 'var(--brown)', style }: ButterflyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="0.7"
      aria-hidden="true"
      style={style}
    >
      <path d="M12 14c-1-3-3-5-5-5-1.5 0-3 1-3 3 0 2 2 4 4 4 1.5 0 3-1 4-2zM12 14c1-3 3-5 5-5 1.5 0 3 1 3 3 0 2-2 4-4 4-1.5 0-3-1-4-2zM12 7v12" />
    </svg>
  )
}
