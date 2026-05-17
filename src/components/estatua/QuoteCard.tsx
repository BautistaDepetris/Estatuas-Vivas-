import Butterfly from './Butterfly'

interface QuoteCardProps {
  frase: string
  autor: string
}

export default function QuoteCard({ frase, autor }: QuoteCardProps) {
  return (
    <section
      style={{
        alignItems: 'center',
        background: 'var(--bg-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '72px 26px',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: 'var(--red)',
          fontFamily: 'var(--font-display)',
          fontSize: '92px',
          lineHeight: 0.6,
          marginBottom: '-10px',
          opacity: 0.18,
        }}
      >
        &quot;
      </span>
      <div className="hr-brown" style={{ background: 'var(--border-dark)', width: '50px' }} />
      <p
        style={{
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.35,
          maxWidth: '280px',
        }}
      >
        {frase}
      </p>
      <div className="hr-brown" style={{ background: 'var(--border-dark)', width: '50px' }} />
      <p className="editorial-lbl" style={{ fontSize: '8px', letterSpacing: '0.32em' }}>
        - {autor}
      </p>
      <Butterfly color="var(--brown)" size={16} style={{ position: 'absolute', right: '36px', top: '28px' }} />
    </section>
  )
}
