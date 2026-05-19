'use client'

import { FormEvent, useMemo, useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'
import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'

interface FotoHome {
  id: string
  url: string
  titulo: string
  descripcion: string
  categoria: string
}

interface LugarHome {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen_url: string
}

const inputStyle = { marginTop: '8px' }

export default function AdminPaginaPrincipalPage() {
  const fotosIniciales = useMemo<FotoHome[]>(
    () =>
      ESTATUAS_MOCK.flatMap((estatua) => estatua.imagenes).slice(0, 8).map((foto, index) => ({
        id: `foto-${index}`,
        url: foto.url,
        titulo: foto.titulo,
        descripcion: foto.descripcion,
        categoria: foto.categoria,
      })),
    []
  )

  const lugaresIniciales = useMemo<LugarHome[]>(
    () =>
      ESTATUAS_MOCK.flatMap((estatua) => estatua.lugares).slice(0, 6).map((lugar, index) => ({
        id: `lugar-${index}`,
        nombre: lugar.nombre,
        descripcion: lugar.descripcion,
        categoria: lugar.categoria,
        imagen_url: '',
      })),
    []
  )

  const [fotos, setFotos] = useState<FotoHome[]>(fotosIniciales)
  const [lugares, setLugares] = useState<LugarHome[]>(lugaresIniciales)
  const [fotoForm, setFotoForm] = useState({ url: '', titulo: '', descripcion: '', categoria: '' })
  const [lugarForm, setLugarForm] = useState({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })
  const [editandoLugarId, setEditandoLugarId] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const avisarGuardado = (texto = 'Guardado ✓') => {
    setError('')
    setMensaje(texto)
    window.setTimeout(() => setMensaje(''), 1800)
  }

  const avisarError = (texto: string) => {
    setMensaje('')
    setError(texto)
  }

  const agregarFoto = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!fotoForm.url || !fotoForm.titulo || !fotoForm.descripcion || !fotoForm.categoria) {
      avisarError('Completá todos los campos de la foto.')
      return
    }

    setFotos((prev) => [...prev, { id: `foto-${Date.now()}`, ...fotoForm }])
    setFotoForm({ url: '', titulo: '', descripcion: '', categoria: '' })
    avisarGuardado()
  }

  const guardarLugar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!lugarForm.nombre || !lugarForm.descripcion || !lugarForm.categoria || !lugarForm.imagen_url) {
      avisarError('Completá todos los campos del lugar.')
      return
    }

    if (editandoLugarId) {
      setLugares((prev) => prev.map((lugar) => (lugar.id === editandoLugarId ? { id: lugar.id, ...lugarForm } : lugar)))
    } else {
      setLugares((prev) => [...prev, { id: `lugar-${Date.now()}`, ...lugarForm }])
    }

    setLugarForm({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })
    setEditandoLugarId(null)
    avisarGuardado()
  }

  const editarLugar = (lugar: LugarHome) => {
    setEditandoLugarId(lugar.id)
    setLugarForm({
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      categoria: lugar.categoria,
      imagen_url: lugar.imagen_url,
    })
  }

  return (
    <section style={{ padding: '40px' }}>
      <header style={{ borderBottom: '0.5px solid var(--border)', marginBottom: '34px', paddingBottom: '28px' }}>
        <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
          <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
          Página Principal
        </p>
        <h1 style={{ fontSize: '38px' }}>Home del recorrido.</h1>
        {(mensaje || error) && (
          <p style={{ color: mensaje ? 'var(--red)' : 'var(--brown)', fontSize: '11px', marginTop: '14px' }}>
            {mensaje || error}
          </p>
        )}
      </header>

      <div style={{ display: 'grid', gap: '40px' }}>
        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p className="editorial-lbl" style={{ marginBottom: '10px' }}>/02</p>
              <h2 style={{ fontSize: '30px' }}>Galería Histórica</h2>
            </div>
            <span className="editorial-lbl">{fotos.length} fotos</span>
          </div>

          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', marginBottom: '28px' }}>
            {fotos.map((foto, index) => (
              <article key={foto.id}>
                <FramedPainting src={foto.url} alt={foto.titulo} height={130} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
                <div style={{ paddingTop: '10px' }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{foto.categoria}</p>
                  <h3 style={{ fontSize: '16px', lineHeight: 1.1 }}>{foto.titulo}</h3>
                  <button className="btn-ghost" onClick={() => { setFotos((prev) => prev.filter((item) => item.id !== foto.id)); avisarGuardado('Foto eliminada ✓') }} style={{ marginTop: '10px', padding: '8px 10px' }}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <form onSubmit={agregarFoto} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar foto nueva</p>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <label className="editorial-lbl">URL de imagen<input required className="input" value={fotoForm.url} onChange={(e) => setFotoForm((prev) => ({ ...prev, url: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Título<input required className="input" value={fotoForm.titulo} onChange={(e) => setFotoForm((prev) => ({ ...prev, titulo: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={fotoForm.descripcion} onChange={(e) => setFotoForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={fotoForm.categoria} onChange={(e) => setFotoForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
            </div>
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>

        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p className="editorial-lbl" style={{ marginBottom: '10px' }}>/03</p>
              <h2 style={{ fontSize: '30px' }}>Lugares para Conocer</h2>
            </div>
            <span className="editorial-lbl">{lugares.length} lugares</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
            {lugares.map((lugar) => (
              <article key={lugar.id} style={{ alignItems: 'flex-start', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: '16px', padding: '16px 0' }}>
                <FramedPainting src={lugar.imagen_url || null} alt={lugar.nombre} width={64} height={64} tone="pastoral" />
                <div style={{ flex: 1 }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{lugar.categoria}</p>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{lugar.nombre}</h3>
                  <p style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{lugar.descripcion}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn-ghost" onClick={() => editarLugar(lugar)} style={{ padding: '8px 10px' }}>Editar</button>
                  <button className="btn-ghost" onClick={() => { setLugares((prev) => prev.filter((item) => item.id !== lugar.id)); avisarGuardado('Lugar eliminado ✓') }} style={{ padding: '8px 10px' }}>Eliminar</button>
                </div>
              </article>
            ))}
          </div>

          <form onSubmit={guardarLugar} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>{editandoLugarId ? 'Editar lugar' : 'Agregar lugar nuevo'}</p>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <label className="editorial-lbl">Nombre<input required className="input" value={lugarForm.nombre} onChange={(e) => setLugarForm((prev) => ({ ...prev, nombre: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={lugarForm.descripcion} onChange={(e) => setLugarForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={lugarForm.categoria} onChange={(e) => setLugarForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">URL imagen<input required className="input" value={lugarForm.imagen_url} onChange={(e) => setLugarForm((prev) => ({ ...prev, imagen_url: e.target.value }))} style={inputStyle} /></label>
            </div>
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>
      </div>
    </section>
  )
}
