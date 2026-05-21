'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'
import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'
import { createClient } from '@/lib/supabase/client'

interface FotoHome {
  id: string
  url: string
  titulo: string
  descripcion: string
  categoria: string
  orden?: number
}

interface LugarHome {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen_url: string | null
  orden?: number
}

const inputStyle = { marginTop: '8px' }
const gridFormStyle = { display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }

function fotosMock(): FotoHome[] {
  return ESTATUAS_MOCK.flatMap((estatua) => estatua.imagenes)
    .slice(0, 8)
    .map((foto, index) => ({
      id: `mock-foto-${index}`,
      url: foto.url,
      titulo: foto.titulo,
      descripcion: foto.descripcion,
      categoria: foto.categoria,
      orden: index,
    }))
}

function lugaresMock(): LugarHome[] {
  return ESTATUAS_MOCK.flatMap((estatua) => estatua.lugares)
    .slice(0, 6)
    .map((lugar, index) => ({
      id: `mock-lugar-${index}`,
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      categoria: lugar.categoria,
      imagen_url: null,
      orden: index,
    }))
}

function esRegistroReal(id: string) {
  return !id.startsWith('mock-') && !id.startsWith('local-')
}

export default function AdminPaginaPrincipalPage() {
  const [fotos, setFotos] = useState<FotoHome[]>([])
  const [lugares, setLugares] = useState<LugarHome[]>([])
  const [fotoForm, setFotoForm] = useState({ archivo: null as File | null, titulo: '', descripcion: '', categoria: '' })
  const [lugarForm, setLugarForm] = useState({
    archivo: null as File | null,
    nombre: '',
    descripcion: '',
    categoria: '',
    imagen_url: null as string | null,
  })
  const [editandoLugarId, setEditandoLugarId] = useState<string | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  const [lugarPreview, setLugarPreview] = useState<string | null>(null)
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!fotoForm.archivo) {
      setFotoPreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(fotoForm.archivo)
    setFotoPreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [fotoForm.archivo])

  useEffect(() => {
    if (!lugarForm.archivo) {
      setLugarPreview(null)
      return
    }

    const previewUrl = URL.createObjectURL(lugarForm.archivo)
    setLugarPreview(previewUrl)
    return () => URL.revokeObjectURL(previewUrl)
  }, [lugarForm.archivo])

  useEffect(() => {
    async function cargarDatos() {
      if (!supabase) {
        setFotos(fotosMock())
        setLugares(lugaresMock())
        setCargando(false)
        return
      }

      const [{ data: galeria, error: galeriaError }, { data: lugaresPueblo, error: lugaresError }] = await Promise.all([
        supabase.from('galeria').select('*').order('orden', { ascending: true }),
        supabase.from('lugares_pueblo').select('*').order('orden', { ascending: true }),
      ])

      setFotos(
        !galeriaError && galeria?.length
          ? galeria.map((foto) => ({
              id: String(foto.id),
              url: foto.url,
              titulo: foto.titulo,
              descripcion: foto.descripcion,
              categoria: foto.categoria,
              orden: foto.orden,
            }))
          : fotosMock()
      )
      setLugares(
        !lugaresError && lugaresPueblo?.length
          ? lugaresPueblo.map((lugar) => ({
              id: String(lugar.id),
              nombre: lugar.nombre,
              descripcion: lugar.descripcion,
              categoria: lugar.categoria,
              imagen_url: lugar.imagen_url ?? null,
              orden: lugar.orden,
            }))
          : lugaresMock()
      )
      setCargando(false)
    }

    cargarDatos()
  }, [supabase])

  const avisarGuardado = (texto = 'Guardado ✓') => {
    setError('')
    setMensaje(texto)
    window.setTimeout(() => setMensaje(''), 1800)
  }

  const avisarError = (texto: string) => {
    setMensaje('')
    setError(texto)
  }

  const subirImagen = async (archivo: File, carpeta: string) => {
    if (!supabase) throw new Error('Supabase no está configurado.')

    const extension = archivo.name.split('.').pop() || 'jpg'
    const nombreArchivo = `${carpeta}/${Date.now()}-${crypto.randomUUID()}.${extension}`
    const { error: uploadError } = await supabase.storage.from('imagenes').upload(nombreArchivo, archivo)

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('imagenes').getPublicUrl(nombreArchivo)
    return data.publicUrl
  }

  const agregarFoto = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!fotoForm.archivo || !fotoForm.titulo.trim() || !fotoForm.descripcion.trim() || !fotoForm.categoria.trim()) {
      avisarError('Completá todos los campos de la foto.')
      return
    }
    if (!supabase) {
      avisarError('Supabase no está configurado. La foto no se puede guardar todavía.')
      return
    }

    try {
      const url = await subirImagen(fotoForm.archivo, 'home/galeria')
      const nuevaFoto = {
        url,
        titulo: fotoForm.titulo.trim(),
        descripcion: fotoForm.descripcion.trim(),
        categoria: fotoForm.categoria.trim(),
        orden: fotos.length,
      }
      const { data, error: insertError } = await supabase.from('galeria').insert(nuevaFoto).select('*').single()

      if (insertError) throw insertError
      setFotos((prev) => [...prev, { id: String(data.id), ...nuevaFoto }])
      setFotoForm({ archivo: null, titulo: '', descripcion: '', categoria: '' })
      setFotoPreview(null)
      event.currentTarget.reset()
      avisarGuardado()
    } catch (err) {
      avisarError(err instanceof Error ? err.message : 'No se pudo guardar la foto.')
    }
  }

  const eliminarFoto = async (foto: FotoHome) => {
    if (supabase && esRegistroReal(foto.id)) {
      const { error: deleteError } = await supabase.from('galeria').delete().eq('id', foto.id)
      if (deleteError) {
        avisarError(deleteError.message)
        return
      }
    }

    setFotos((prev) => prev.filter((item) => item.id !== foto.id))
    avisarGuardado('Foto eliminada ✓')
  }

  const guardarLugar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!lugarForm.nombre.trim() || !lugarForm.descripcion.trim() || !lugarForm.categoria.trim()) {
      avisarError('Completá nombre, descripción y categoría del lugar.')
      return
    }
    if (!editandoLugarId && !lugarForm.archivo) {
      avisarError('Subí una imagen para el lugar.')
      return
    }
    if (!supabase) {
      avisarError('Supabase no está configurado. El lugar no se puede guardar todavía.')
      return
    }

    try {
      const imagenUrl = lugarForm.archivo ? await subirImagen(lugarForm.archivo, 'home/lugares') : lugarForm.imagen_url
      const payload = {
        nombre: lugarForm.nombre.trim(),
        descripcion: lugarForm.descripcion.trim(),
        categoria: lugarForm.categoria.trim(),
        imagen_url: imagenUrl,
        orden: editandoLugarId ? lugares.find((lugar) => lugar.id === editandoLugarId)?.orden ?? 0 : lugares.length,
      }

      if (editandoLugarId && esRegistroReal(editandoLugarId)) {
        const { error: updateError } = await supabase.from('lugares_pueblo').update(payload).eq('id', editandoLugarId)
        if (updateError) throw updateError
        setLugares((prev) => prev.map((lugar) => (lugar.id === editandoLugarId ? { id: lugar.id, ...payload } : lugar)))
      } else {
        const { data, error: insertError } = await supabase.from('lugares_pueblo').insert(payload).select('*').single()
        if (insertError) throw insertError
        setLugares((prev) => [...prev, { id: String(data.id), ...payload }])
      }

      setLugarForm({ archivo: null, nombre: '', descripcion: '', categoria: '', imagen_url: null })
      setLugarPreview(null)
      setEditandoLugarId(null)
      event.currentTarget.reset()
      avisarGuardado()
    } catch (err) {
      avisarError(err instanceof Error ? err.message : 'No se pudo guardar el lugar.')
    }
  }

  const editarLugar = (lugar: LugarHome) => {
    setEditandoLugarId(lugar.id)
    setLugarForm({
      archivo: null,
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      categoria: lugar.categoria,
      imagen_url: lugar.imagen_url,
    })
  }

  const eliminarLugar = async (lugar: LugarHome) => {
    if (supabase && esRegistroReal(lugar.id)) {
      const { error: deleteError } = await supabase.from('lugares_pueblo').delete().eq('id', lugar.id)
      if (deleteError) {
        avisarError(deleteError.message)
        return
      }
    }

    setLugares((prev) => prev.filter((item) => item.id !== lugar.id))
    avisarGuardado('Lugar eliminado ✓')
  }

  return (
    <section style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
      <header style={{ borderBottom: '0.5px solid var(--border)', marginBottom: '34px', paddingBottom: '28px' }}>
        <p className="editorial-lbl" style={{ alignItems: 'center', display: 'inline-flex', gap: '10px', marginBottom: '14px' }}>
          <span style={{ background: 'var(--red)', height: '0.5px', width: '24px' }} />
          Página Principal
        </p>
        <h1 style={{ fontSize: '38px' }}>Home del recorrido.</h1>
        {(mensaje || error || cargando) && (
          <p style={{ color: mensaje ? 'var(--red)' : 'var(--brown)', fontSize: '11px', marginTop: '14px' }}>
            {cargando ? 'Cargando contenido...' : mensaje || error}
          </p>
        )}
      </header>

      <div style={{ display: 'grid', gap: '40px' }}>
        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', gap: '18px', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p className="editorial-lbl" style={{ marginBottom: '10px' }}>/02</p>
              <h2 style={{ fontSize: '30px' }}>Galería Histórica</h2>
            </div>
            <span className="editorial-lbl">{fotos.length} fotos</span>
          </div>

          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', marginBottom: '28px' }}>
            {fotos.map((foto, index) => (
              <article key={foto.id}>
                <FramedPainting src={foto.url} alt={foto.titulo} height={130} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
                <div style={{ paddingTop: '10px' }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{foto.categoria}</p>
                  <h3 style={{ fontSize: '16px', lineHeight: 1.1 }}>{foto.titulo}</h3>
                  <button className="btn-ghost" onClick={() => eliminarFoto(foto)} style={{ marginTop: '10px', padding: '8px 10px' }}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <form onSubmit={agregarFoto} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar foto nueva</p>
            <div style={gridFormStyle}>
              <label className="editorial-lbl">Subir imagen<input required type="file" accept="image/*" className="input" onChange={(e) => setFotoForm((prev) => ({ ...prev, archivo: e.target.files?.[0] ?? null }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Título<input required className="input" value={fotoForm.titulo} onChange={(e) => setFotoForm((prev) => ({ ...prev, titulo: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={fotoForm.descripcion} onChange={(e) => setFotoForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={fotoForm.categoria} onChange={(e) => setFotoForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
            </div>
            {fotoPreview && (
              <div style={{ marginTop: '18px', maxWidth: '220px' }}>
                <p className="editorial-lbl" style={{ marginBottom: '8px' }}>Preview</p>
                <img src={fotoPreview} alt="Preview de la foto" style={{ display: 'block', height: '140px', objectFit: 'cover', width: '100%' }} />
              </div>
            )}
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>

        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', gap: '18px', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <p className="editorial-lbl" style={{ marginBottom: '10px' }}>/03</p>
              <h2 style={{ fontSize: '30px' }}>Lugares para Conocer</h2>
            </div>
            <span className="editorial-lbl">{lugares.length} lugares</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
            {lugares.map((lugar) => (
              <article key={lugar.id} style={{ alignItems: 'flex-start', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: '16px', padding: '16px 0' }}>
                <FramedPainting src={lugar.imagen_url} alt={lugar.nombre} width={64} height={64} tone="pastoral" />
                <div style={{ flex: 1 }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{lugar.categoria}</p>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{lugar.nombre}</h3>
                  <p style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{lugar.descripcion}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button className="btn-ghost" onClick={() => editarLugar(lugar)} style={{ padding: '8px 10px' }}>Editar</button>
                  <button className="btn-ghost" onClick={() => eliminarLugar(lugar)} style={{ padding: '8px 10px' }}>Eliminar</button>
                </div>
              </article>
            ))}
          </div>

          <form onSubmit={guardarLugar} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>{editandoLugarId ? 'Editar lugar' : 'Agregar lugar nuevo'}</p>
            <div style={gridFormStyle}>
              <label className="editorial-lbl">Nombre<input required className="input" value={lugarForm.nombre} onChange={(e) => setLugarForm((prev) => ({ ...prev, nombre: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={lugarForm.descripcion} onChange={(e) => setLugarForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={lugarForm.categoria} onChange={(e) => setLugarForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Subir imagen<input required={!editandoLugarId} type="file" accept="image/*" className="input" onChange={(e) => setLugarForm((prev) => ({ ...prev, archivo: e.target.files?.[0] ?? null }))} style={inputStyle} /></label>
            </div>
            {(lugarPreview || lugarForm.imagen_url) && (
              <div style={{ marginTop: '18px', maxWidth: '220px' }}>
                <p className="editorial-lbl" style={{ marginBottom: '8px' }}>Preview</p>
                <img src={lugarPreview || lugarForm.imagen_url || ''} alt="Preview del lugar" style={{ display: 'block', height: '140px', objectFit: 'cover', width: '100%' }} />
              </div>
            )}
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>
      </div>
    </section>
  )
}
