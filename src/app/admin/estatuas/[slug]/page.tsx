'use client'

import Link from 'next/link'
import { FormEvent, use, useMemo, useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'
import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'

interface AdminEstatuaEditorPageProps {
  params: Promise<{ slug: string }>
}

interface FotoForm {
  id: string
  url: string
  titulo: string
  descripcion: string
  categoria: string
}

interface LugarForm {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen_url: string
}

const inputStyle = { marginTop: '8px' }

export default function AdminEstatuaEditorPage({ params }: AdminEstatuaEditorPageProps) {
  const slug = use(params).slug
  const estatua = ESTATUAS_MOCK.find((item) => item.slug === slug)

  const capitulosIniciales = useMemo(
    () => (estatua?.capitulos ?? []).slice(0, 7).map((capitulo) => ({ ...capitulo })),
    [estatua]
  )
  const fotosIniciales = useMemo<FotoForm[]>(
    () => (estatua?.imagenes ?? []).map((foto, index) => ({ id: `foto-${index}`, ...foto })),
    [estatua]
  )
  const lugaresIniciales = useMemo<LugarForm[]>(
    () => (estatua?.lugares ?? []).map((lugar, index) => ({ id: `lugar-${index}`, imagen_url: '', ...lugar })),
    [estatua]
  )

  const [capitulos, setCapitulos] = useState(capitulosIniciales)
  const [frase, setFrase] = useState(estatua?.frase ?? '')
  const [fotos, setFotos] = useState(fotosIniciales)
  const [lugares, setLugares] = useState(lugaresIniciales)
  const [fotoForm, setFotoForm] = useState({ url: '', titulo: '', descripcion: '', categoria: '' })
  const [lugarForm, setLugarForm] = useState({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })
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

  const guardarCapitulos = () => {
    if (capitulos.some((capitulo) => !capitulo.titulo.trim() || !capitulo.texto.trim())) {
      avisarError('Completá título y texto en los 7 capítulos.')
      return
    }
    avisarGuardado()
  }

  const guardarFrase = () => {
    if (!frase.trim()) {
      avisarError('La frase destacada es requerida.')
      return
    }
    avisarGuardado()
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

  const agregarLugar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!lugarForm.nombre || !lugarForm.descripcion || !lugarForm.categoria || !lugarForm.imagen_url) {
      avisarError('Completá todos los campos del lugar.')
      return
    }
    setLugares((prev) => [...prev, { id: `lugar-${Date.now()}`, ...lugarForm }])
    setLugarForm({ nombre: '', descripcion: '', categoria: '', imagen_url: '' })
    avisarGuardado()
  }

  if (!estatua) {
    return (
      <section style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '36px' }}>No encontramos esa estatua.</h1>
        <Link className="btn-red" href="/admin/estatuas" style={{ marginTop: '24px' }}>Volver</Link>
      </section>
    )
  }

  return (
    <section style={{ padding: '40px' }}>
      <header style={{ borderBottom: '0.5px solid var(--border)', marginBottom: '34px', paddingBottom: '28px' }}>
        <Link className="editorial-lbl" href="/admin/estatuas" style={{ color: 'var(--red)' }}>← Volver a estatuas</Link>
        <h1 style={{ color: 'var(--red)', fontSize: '42px', marginTop: '16px' }}>{estatua.nombre}</h1>
        <p style={{ color: 'var(--ink-3)', fontSize: '12px', marginTop: '8px' }}>{estatua.subtitulo}</p>
        {(mensaje || error) && (
          <p style={{ color: mensaje ? 'var(--red)' : 'var(--brown)', fontSize: '11px', marginTop: '14px' }}>{mensaje || error}</p>
        )}
      </header>

      <div style={{ display: 'grid', gap: '34px' }}>
        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: '22px' }}>
            <h2 style={{ fontSize: '30px' }}>Los 7 Capítulos</h2>
            <button className="btn-red" onClick={guardarCapitulos}>Guardar sección</button>
          </div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {capitulos.map((capitulo, index) => (
              <article key={index} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
                <p className="editorial-lbl" style={{ marginBottom: '10px' }}>Capítulo {index + 1}</p>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <input
                    className="input"
                    required
                    value={capitulo.titulo}
                    onChange={(event) => setCapitulos((prev) => prev.map((item, itemIndex) => itemIndex === index ? { ...item, titulo: event.target.value } : item))}
                  />
                  <textarea
                    required
                    value={capitulo.texto}
                    onChange={(event) => setCapitulos((prev) => prev.map((item, itemIndex) => itemIndex === index ? { ...item, texto: event.target.value } : item))}
                    style={{
                      background: 'var(--paper)',
                      border: '0.5px solid var(--border)',
                      color: 'var(--ink)',
                      fontFamily: 'var(--font-body)',
                      minHeight: '120px',
                      padding: '12px 14px',
                      resize: 'vertical',
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '30px' }}>Frase Destacada</h2>
            <button className="btn-red" onClick={guardarFrase}>Guardar</button>
          </div>
          <textarea
            required
            value={frase}
            onChange={(event) => setFrase(event.target.value)}
            style={{
              background: 'var(--paper)',
              border: '0.5px solid var(--border)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontStyle: 'italic',
              minHeight: '120px',
              padding: '16px',
              resize: 'vertical',
              width: '100%',
            }}
          />
        </section>

        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <h2 style={{ fontSize: '30px', marginBottom: '22px' }}>Vida en Archivos</h2>
          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', marginBottom: '26px' }}>
            {fotos.map((foto, index) => (
              <article key={foto.id}>
                <FramedPainting src={foto.url} alt={foto.titulo} height={130} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
                <h3 style={{ fontSize: '16px', marginTop: '10px' }}>{foto.titulo}</h3>
                <button className="btn-ghost" onClick={() => { setFotos((prev) => prev.filter((item) => item.id !== foto.id)); avisarGuardado('Foto eliminada ✓') }} style={{ marginTop: '10px', padding: '8px 10px' }}>Eliminar</button>
              </article>
            ))}
          </div>
          <form onSubmit={agregarFoto} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar foto</p>
            <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <label className="editorial-lbl">URL<input required className="input" value={fotoForm.url} onChange={(e) => setFotoForm((prev) => ({ ...prev, url: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Título<input required className="input" value={fotoForm.titulo} onChange={(e) => setFotoForm((prev) => ({ ...prev, titulo: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={fotoForm.descripcion} onChange={(e) => setFotoForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={fotoForm.categoria} onChange={(e) => setFotoForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
            </div>
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>

        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <h2 style={{ fontSize: '30px', marginBottom: '22px' }}>El Pueblo Recomienda</h2>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '26px' }}>
            {lugares.map((lugar) => (
              <article key={lugar.id} style={{ alignItems: 'flex-start', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: '16px', padding: '16px 0' }}>
                <FramedPainting src={lugar.imagen_url || null} alt={lugar.nombre} width={64} height={64} tone="pastoral" />
                <div style={{ flex: 1 }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{lugar.categoria}</p>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{lugar.nombre}</h3>
                  <p style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{lugar.descripcion}</p>
                </div>
                <button className="btn-ghost" onClick={() => { setLugares((prev) => prev.filter((item) => item.id !== lugar.id)); avisarGuardado('Lugar eliminado ✓') }} style={{ padding: '8px 10px' }}>Eliminar</button>
              </article>
            ))}
          </div>
          <form onSubmit={agregarLugar} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar lugar</p>
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
