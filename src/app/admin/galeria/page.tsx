'use client'

import { useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'

interface FotoGaleria {
  id: string
  url: string
  titulo: string
  descripcion: string
  categoria: string
}

const FOTOS_INICIALES: FotoGaleria[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    titulo: 'Sierras al Atardecer',
    descripcion: 'Las sierras cordobesas en hora dorada.',
    categoria: 'Paisaje',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    titulo: 'Caminos de Altura',
    descripcion: 'Senderos por las sierras.',
    categoria: 'Naturaleza',
  },
]

export default function AdminGaleriaPage() {
  const [fotos, setFotos] = useState<FotoGaleria[]>(FOTOS_INICIALES)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [form, setForm] = useState({ url: '', titulo: '', descripcion: '', categoria: '' })

  const agregarFoto = () => {
    if (!form.url || !form.titulo) return
    setFotos((prev) => [...prev, { id: Date.now().toString(), ...form }])
    setForm({ url: '', titulo: '', descripcion: '', categoria: '' })
    setMostrarFormulario(false)
  }

  return (
    <section style={{ padding: '40px' }}>
      <div style={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
            <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
            Archivo visual
          </p>
          <h1 style={{ fontSize: '36px' }}>Galeria.</h1>
        </div>
        <button className={mostrarFormulario ? 'btn-ghost' : 'btn-red'} onClick={() => setMostrarFormulario((value) => !value)}>
          {mostrarFormulario ? 'Cancelar' : '+ Agregar foto'}
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', marginBottom: '28px', padding: '24px' }}>
          <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: '1fr 1fr' }}>
            {(['url', 'titulo', 'descripcion', 'categoria'] as const).map((key) => (
              <label key={key} className="editorial-lbl" style={{ display: 'block', fontSize: '8px' }}>
                {key}
                <input
                  className="input"
                  value={form[key]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))}
                  placeholder={key === 'url' ? 'https://images.unsplash.com/...' : key}
                  style={{ marginTop: '8px' }}
                />
              </label>
            ))}
          </div>
          <button className="btn-red" onClick={agregarFoto} style={{ marginTop: '18px' }}>
            Guardar fotografia
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {fotos.map((foto, index) => (
          <article key={foto.id}>
            <FramedPainting src={foto.url} alt={foto.titulo} height={160} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
            <div style={{ paddingTop: '12px' }}>
              <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '6px' }}>{foto.categoria}</p>
              <h2 style={{ fontSize: '18px', marginBottom: '4px' }}>{foto.titulo}</h2>
              <p style={{ color: 'var(--ink-3)', fontSize: '10px' }}>{foto.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
