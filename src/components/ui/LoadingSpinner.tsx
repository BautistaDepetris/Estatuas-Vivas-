export default function LoadingSpinner({ texto = 'Cargando...' }: { texto?: string }) {
  return (
    <div
      className="paper-bg"
      style={{
        alignItems: 'center',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        justifyContent: 'center',
        minHeight: '200px',
      }}
    >
      <div
        style={{
          animation: 'spin 0.8s linear infinite',
          border: '0.5px solid var(--border)',
          borderTopColor: 'var(--red)',
          height: '34px',
          width: '34px',
        }}
      />
      <p style={{ color: 'var(--ink-3)', fontFamily: 'var(--font-display)', fontSize: '16px', fontStyle: 'italic' }}>
        {texto}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
