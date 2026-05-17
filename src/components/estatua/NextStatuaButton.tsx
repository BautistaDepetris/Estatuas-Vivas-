import Link from 'next/link'
import { Estatua } from '@/types'
import FramedPainting from './FramedPainting'

interface NextStatuaButtonProps {
  siguiente: Estatua
}

export default function NextStatuaButton({ siguiente }: NextStatuaButtonProps) {
  const imagen = siguiente.imagenes[0]

  return (
    <Link href={`/estatuas/${siguiente.slug}`} style={{ display: 'block' }}>
      <section style={{ height: '200px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <FramedPainting src={imagen?.url} alt={imagen?.titulo ?? siguiente.nombre} height="100%" tone="ember" fill />
        </div>
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(245,237,216,0.5) 0%, rgba(245,237,216,0.85) 100%)',
            inset: 0,
            position: 'absolute',
          }}
        />
        <div
          style={{
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            left: '26px',
            position: 'absolute',
            right: '26px',
            top: 0,
            zIndex: 5,
          }}
        >
          <p className="editorial-lbl" style={{ marginBottom: '10px' }}>
            Continua el recorrido
          </p>
          <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ color: 'var(--red)', fontSize: '32px' }}>{siguiente.nombre}</h2>
            <span style={{ color: 'var(--red)', fontSize: '22px' }}>→</span>
          </div>
          <p style={{ color: 'var(--ink-3)', fontSize: '10px', letterSpacing: '0.05em', marginTop: '8px' }}>
            Siguiente punto del recorrido
          </p>
        </div>
      </section>
    </Link>
  )
}
