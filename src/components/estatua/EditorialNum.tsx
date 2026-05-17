interface EditorialNumProps {
  num: string
  label: string
  line?: boolean
}

export default function EditorialNum({ num, label, line = true }: EditorialNumProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
      <span className="editorial-num">/{num}</span>
      {line && <span style={{ width: '24px', height: '0.5px', background: 'var(--red)', transform: 'translateY(-3px)' }} />}
      <span className="editorial-lbl">{label}</span>
    </div>
  )
}
