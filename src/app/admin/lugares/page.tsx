'use client'

import { useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'

interface LugarPueblo {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen_url: string
}

const LUGARES_INICIALES: LugarPueblo[] = [
  {
    id: '1',
    nombre: 'Capilla Brochero',
    descripcion: 'El recinto donde oficio sus ultimas misas. Patrimonio historico provincial desde 1983.',
    categoria: 'Patrimonio Religioso',
    imagen_url: '',
  },
  {
    id: '2',
    nombre: 'Iglesia San Lorenzo',
    descripcion: 'El edificio historico del pueblo, epicentro de la devocion desde 1887.',
    categoria: 'Patrimonio Religioso',
    imagen_url: '',
  },
  {
    id: '3',
    nombre: 'Plaza Central',
    descripcion: 'El corazon civico de Villa San Lorenzo desde su fundacion.',
    categoria: 'Espacio Publico',
    imagen_url: '',
  },
  {
    id: '4',
    nombre: 'Sendero de las Sierras',
    descripcion: 'El camino que Brochero recorrio innumerables veces.',
    categoria: 'Naturaleza',
    imagen_url: '',
  },
]

export default function AdminLugaresPage() {
  const [lugares, setLugares] = useState<LugarPueblo[]>(LUGARES_INICIALES)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [form, setForm] = useState({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })

  const agregarLugar = () => {
    if (!form.nombre) return
    setLugares((prev) => [...prev, { id: Date.now().toString(), ...form }])
    setForm({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })
    setMostrarFormulario(false)
  }

  return (
    <section style={{ padding: '40px' }}>
      <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
            <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
            Pueblo
          </p>
          <h1 style={{ fontSize: '36px' }}>Lugares.</h1>
        </div>
        <button className={mostrarFormulario ? 'btn-ghost' : 'btn-red'} onClick={() => setMostrarFormulario((value) => !value)}>
          {mostrarFormulario ? 'Cancelar' : '+ Agregar lugar'}
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', marginBottom: '28px', padding: '24px' }}>
          <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: '1fr 1fr' }}>
            {(['nombre', 'descripcion', 'categoria', 'imagen_url'] as const).map((key) => (
              <label key={key} className="editorial-lbl" style={{ display: 'block', fontSize: '8px' }}>
                {key}
                <input
                  className="input"
                  value={form[key]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
                  placeholder={key}
                  style={{ marginTop: '8px' }}
                />
              </label>
            ))}
          </div>
          <button className="btn-red" onClick={agregarLugar} style={{ marginTop: '18px' }}>
            Guardar lugar
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {lugares.map((lugar, index) => (
          <article
            key={lugar.id}
            style={{
              alignItems: 'flex-start',
              borderBottom: '0.5px solid var(--border)',
              display: 'flex',
              gap: '18px',
              padding: '22px 0',
            }}
          >
            <FramedPainting src={lugar.imagen_url || null} alt={lugar.nombre} width={74} height={74} tone={index % 2 === 0 ? 'pastoral' : 'sepia'} />
            <div style={{ flex: 1 }}>
              <p className="editorial-lbl" style={{ fontSize: '8px', marginBottom: '6px' }}>{lugar.categoria}</p>
              <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>{lugar.nombre}</h2>
              <p style={{ color: 'var(--ink-3)', fontSize: '11px', lineHeight: 1.6 }}>{lugar.descripcion}</p>
            </div>
            <button className="btn-ghost" onClick={() => setLugares((prev) => prev.filter((item) => item.id !== lugar.id))}>
              Eliminar
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
