'use client'

import Link from 'next/link'
import { FormEvent, use, useEffect, useMemo, useState } from 'react'
import FramedPainting from '@/components/estatua/FramedPainting'
import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'
import { createClient } from '@/lib/supabase/client'

interface AdminEstatuaEditorPageProps {
  params: Promise<{ slug: string }>
}

interface CapituloAdmin {
  id?: string
  titulo: string
  texto: string
  orden: number
}

interface FotoAdmin {
  id: string
  url: string
  titulo: string
  descripcion: string
  categoria: string
  orden?: number
}

interface LugarAdmin {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen_url: string | null
  orden?: number
}

const inputStyle = { marginTop: '8px' }
const gridFormStyle = { display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }

function esRegistroReal(id?: string) {
  return !!id && !id.startsWith('mock-') && !id.startsWith('local-')
}

function esUuid(valor: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(valor)
}

export default function AdminEstatuaEditorPage({ params }: AdminEstatuaEditorPageProps) {
  const slug = use(params).slug
  const estatuaMock = ESTATUAS_MOCK.find((item) => item.slug === slug)
  const [estatuaId, setEstatuaId] = useState('')
  const [tituloEstatua, setTituloEstatua] = useState(estatuaMock?.nombre ?? '')
  const [subtituloEstatua, setSubtituloEstatua] = useState(estatuaMock?.subtitulo ?? '')
  const [capitulos, setCapitulos] = useState<CapituloAdmin[]>([])
  const [frase, setFrase] = useState(estatuaMock?.frase ?? '')
  const [fotos, setFotos] = useState<FotoAdmin[]>([])
  const [lugares, setLugares] = useState<LugarAdmin[]>([])
  const [fotoForm, setFotoForm] = useState({ archivo: null as File | null, titulo: '', descripcion: '', categoria: '' })
  const [lugarForm, setLugarForm] = useState({ archivo: null as File | null, nombre: '', descripcion: '', categoria: '' })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)
  const [noEncontrada, setNoEncontrada] = useState(false)
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
    async function cargarEstatua() {
      const capitulosMock = (estatuaMock?.capitulos ?? []).slice(0, 7).map((capitulo, index) => ({
        id: `mock-capitulo-${index}`,
        titulo: capitulo.titulo,
        texto: capitulo.texto,
        orden: index,
      }))
      const fotosMock = (estatuaMock?.imagenes ?? []).map((foto, index) => ({ id: `mock-foto-${index}`, ...foto, orden: index }))
      const lugaresMock = (estatuaMock?.lugares ?? []).map((lugar, index) => ({
        id: `mock-lugar-${index}`,
        imagen_url: lugar.imagen_url ?? null,
        ...lugar,
        orden: index,
      }))

      if (!supabase) {
        if (!estatuaMock) setNoEncontrada(true)
        setCapitulos(completarSieteCapitulos(capitulosMock))
        setFotos(fotosMock)
        setLugares(lugaresMock)
        setCargando(false)
        return
      }

      const { data: estatua, error: estatuaError } = await supabase
        .from('estatuas')
        .select('*')
        .eq('slug', slug)
        .single()

      if (estatuaError || !estatua) {
        if (!estatuaMock) setNoEncontrada(true)
        setCapitulos(completarSieteCapitulos(capitulosMock))
        setFotos(fotosMock)
        setLugares(lugaresMock)
        setCargando(false)
        return
      }

      setNoEncontrada(false)
      setEstatuaId(String(estatua.id))
      setTituloEstatua(estatua.nombre)
      setSubtituloEstatua(estatua.subtitulo)
      setFrase(estatua.frase ?? '')

      const [{ data: capitulosDb }, { data: fotosDb }, { data: lugaresDb }] = await Promise.all([
        supabase.from('capitulos').select('*').eq('estatua_id', estatua.id).order('orden', { ascending: true }),
        supabase.from('estatua_imagenes').select('*').eq('estatua_id', estatua.id).order('orden', { ascending: true }),
        supabase.from('lugares').select('*').eq('estatua_id', estatua.id).order('orden', { ascending: true }),
      ])

      setCapitulos(
        completarSieteCapitulos(
          capitulosDb?.length
            ? capitulosDb.map((capitulo) => ({
                id: String(capitulo.id),
                titulo: capitulo.titulo,
                texto: capitulo.texto,
                orden: capitulo.orden,
              }))
            : capitulosMock
        )
      )
      setFotos(
        fotosDb?.length
          ? fotosDb.map((foto) => ({
              id: String(foto.id),
              url: foto.url,
              titulo: foto.titulo,
              descripcion: foto.descripcion,
              categoria: foto.categoria,
              orden: foto.orden,
            }))
          : fotosMock
      )
      setLugares(
        lugaresDb?.length
          ? lugaresDb.map((lugar) => ({
              id: String(lugar.id),
              nombre: lugar.nombre,
              descripcion: lugar.descripcion,
              categoria: lugar.categoria,
              imagen_url: lugar.imagen_url ?? null,
              orden: lugar.orden,
            }))
          : lugaresMock
      )
      setCargando(false)
    }

    cargarEstatua()
  }, [estatuaMock, slug, supabase])

  const avisarGuardado = (texto = 'Guardado ✓') => {
    setError('')
    setMensaje(texto)
    window.setTimeout(() => setMensaje(''), 1800)
  }

  const avisarError = (texto: string) => {
    setMensaje('')
    setError(texto)
  }

  const subirImagen = async (archivo: File) => {
    if (!supabase) throw new Error('Supabase no está configurado.')

    const extension = archivo.name.split('.').pop() || 'jpg'
    const nombreArchivo = `estatuas/${slug}/${Date.now()}-${crypto.randomUUID()}.${extension}`
    const { error: uploadError } = await supabase.storage.from('imagenes').upload(nombreArchivo, archivo)

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('imagenes').getPublicUrl(nombreArchivo)
    return data.publicUrl
  }

  const obtenerEstatuaId = async () => {
    if (!supabase) return null
    if (esUuid(estatuaId)) return estatuaId

    const { data, error: selectError } = await supabase
      .from('estatuas')
      .select('id')
      .eq('slug', slug)
      .single()

    if (selectError || !data?.id) {
      return null
    }

    const id = String(data.id)
    setEstatuaId(id)
    return id
  }

  const guardarCapitulos = async () => {
    if (capitulos.some((capitulo) => !capitulo.titulo.trim() || !capitulo.texto.trim())) {
      avisarError('Completá título y texto en los 7 capítulos.')
      return
    }
    if (!supabase || !estatuaId) {
      avisarError('Supabase no está configurado. Los capítulos no se pueden guardar todavía.')
      return
    }

    const operaciones = capitulos.slice(0, 7).map((capitulo, index) => {
      const payload = {
        estatua_id: estatuaId,
        titulo: capitulo.titulo.trim(),
        texto: capitulo.texto.trim(),
        orden: index,
      }

      if (esRegistroReal(capitulo.id)) {
        return supabase.from('capitulos').update(payload).eq('id', capitulo.id)
      }

      return supabase.from('capitulos').insert(payload)
    })

    const resultados = await Promise.all(operaciones)
    const errorOperacion = resultados.find((resultado) => resultado.error)?.error
    if (errorOperacion) {
      avisarError(errorOperacion.message)
      return
    }

    avisarGuardado()
  }

  const guardarFrase = async () => {
    if (!frase.trim()) {
      avisarError('La frase destacada es requerida.')
      return
    }
    if (!supabase || !estatuaId) {
      avisarError('Supabase no está configurado. La frase no se puede guardar todavía.')
      return
    }

    const { error: updateError } = await supabase.from('estatuas').update({ frase: frase.trim() }).eq('id', estatuaId)
    if (updateError) {
      avisarError(updateError.message)
      return
    }

    avisarGuardado()
  }

  const agregarFoto = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!fotoForm.archivo || !fotoForm.titulo.trim() || !fotoForm.descripcion.trim() || !fotoForm.categoria.trim()) {
      avisarError('Completá todos los campos de la foto.')
      return
    }
    if (!supabase || !estatuaId) {
      avisarError('Supabase no está configurado. La foto no se puede guardar todavía.')
      return
    }

    try {
      const url = await subirImagen(fotoForm.archivo)
      const nuevaFoto = {
        estatua_id: estatuaId,
        url,
        titulo: fotoForm.titulo.trim(),
        descripcion: fotoForm.descripcion.trim(),
        categoria: fotoForm.categoria.trim(),
        orden: fotos.length,
      }
      const { data, error: insertError } = await supabase.from('estatua_imagenes').insert(nuevaFoto).select('*').single()

      if (insertError) throw insertError
      setFotos((prev) => [...prev, { id: String(data.id), url, titulo: nuevaFoto.titulo, descripcion: nuevaFoto.descripcion, categoria: nuevaFoto.categoria, orden: nuevaFoto.orden }])
      setFotoForm({ archivo: null, titulo: '', descripcion: '', categoria: '' })
      setFotoPreview(null)
      event.currentTarget.reset()
      avisarGuardado()
    } catch (err) {
      avisarError(err instanceof Error ? err.message : 'No se pudo guardar la foto.')
    }
  }

  const eliminarFoto = async (foto: FotoAdmin) => {
    if (supabase && esRegistroReal(foto.id)) {
      const { error: deleteError } = await supabase.from('estatua_imagenes').delete().eq('id', foto.id)
      if (deleteError) {
        avisarError(deleteError.message)
        return
      }
    }

    setFotos((prev) => prev.filter((item) => item.id !== foto.id))
    avisarGuardado('Foto eliminada ✓')
  }

  const agregarLugar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!lugarForm.archivo || !lugarForm.nombre.trim() || !lugarForm.descripcion.trim() || !lugarForm.categoria.trim()) {
      avisarError('Completá todos los campos del lugar.')
      return
    }
    if (!supabase) {
      avisarError('Supabase no está configurado. El lugar no se puede guardar todavía.')
      return
    }

    try {
      const estatuaIdReal = await obtenerEstatuaId()
      if (!estatuaIdReal) {
        avisarError('No se encontró el ID de la estatua en Supabase.')
        return
      }

      const imagenUrl = await subirImagen(lugarForm.archivo)
      const nuevoLugar = {
        estatua_id: estatuaIdReal,
        nombre: lugarForm.nombre.trim(),
        descripcion: lugarForm.descripcion.trim(),
        categoria: lugarForm.categoria.trim(),
        imagen_url: imagenUrl,
        orden: lugares.length,
      }
      const { data, error: insertError } = await supabase
        .from('lugares')
        .insert(nuevoLugar)
        .select('id,nombre,descripcion,categoria,imagen_url,orden')
        .single()
      if (insertError) throw insertError

      setLugares((prev) => [
        ...prev,
        {
          id: String(data.id),
          nombre: nuevoLugar.nombre,
          descripcion: nuevoLugar.descripcion,
          categoria: nuevoLugar.categoria,
          imagen_url: nuevoLugar.imagen_url,
          orden: nuevoLugar.orden,
        },
      ])
      setLugarForm({ archivo: null, nombre: '', descripcion: '', categoria: '' })
      setLugarPreview(null)
      event.currentTarget.reset()
      avisarGuardado()
    } catch (err) {
      avisarError(err instanceof Error ? err.message : 'No se pudo guardar el lugar.')
    }
  }

  const eliminarLugar = async (lugar: LugarAdmin) => {
    if (supabase && esRegistroReal(lugar.id)) {
      const { error: deleteError } = await supabase.from('lugares').delete().eq('id', lugar.id)
      if (deleteError) {
        avisarError(deleteError.message)
        return
      }
    }

    setLugares((prev) => prev.filter((item) => item.id !== lugar.id))
    avisarGuardado('Lugar eliminado ✓')
  }

  if (noEncontrada) {
    return (
      <section style={{ padding: '40px' }}>
        <h1 style={{ fontSize: '36px' }}>No encontramos esa estatua.</h1>
        <Link className="btn-red" href="/admin/estatuas" style={{ marginTop: '24px' }}>Volver</Link>
      </section>
    )
  }

  return (
    <section style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
      <header style={{ borderBottom: '0.5px solid var(--border)', marginBottom: '34px', paddingBottom: '28px' }}>
        <Link className="editorial-lbl" href="/admin/estatuas" style={{ color: 'var(--red)' }}>← Volver a estatuas</Link>
        <h1 style={{ color: 'var(--red)', fontSize: '42px', marginTop: '16px' }}>{tituloEstatua}</h1>
        <p style={{ color: 'var(--ink-3)', fontSize: '12px', marginTop: '8px' }}>{subtituloEstatua}</p>
        {(mensaje || error || cargando) && (
          <p style={{ color: mensaje ? 'var(--red)' : 'var(--brown)', fontSize: '11px', marginTop: '14px' }}>
            {cargando ? 'Cargando contenido...' : mensaje || error}
          </p>
        )}
      </header>

      <div style={{ display: 'grid', gap: '34px' }}>
        <section style={{ background: 'var(--bg-2)', border: '0.5px solid var(--border)', padding: '28px' }}>
          <div style={{ alignItems: 'baseline', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', marginBottom: '22px' }}>
            <h2 style={{ fontSize: '30px' }}>Los 7 Capítulos</h2>
            <button className="btn-red" onClick={guardarCapitulos}>Guardar sección</button>
          </div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {capitulos.map((capitulo, index) => (
              <article key={`${capitulo.id}-${index}`} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '16px' }}>
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
                      color: '#1C1008',
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
          <div style={{ alignItems: 'baseline', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', marginBottom: '18px' }}>
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
              color: '#1C1008',
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
          <div style={{ display: 'grid', gap: '18px', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', marginBottom: '26px' }}>
            {fotos.map((foto, index) => (
              <article key={foto.id}>
                <FramedPainting src={foto.url} alt={foto.titulo} height={130} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
                <h3 style={{ fontSize: '16px', marginTop: '10px' }}>{foto.titulo}</h3>
                <button className="btn-ghost" onClick={() => eliminarFoto(foto)} style={{ marginTop: '10px', padding: '8px 10px' }}>Eliminar</button>
              </article>
            ))}
          </div>
          <form onSubmit={agregarFoto} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar foto</p>
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
          <h2 style={{ fontSize: '30px', marginBottom: '22px' }}>El Pueblo Recomienda</h2>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '26px' }}>
            {lugares.map((lugar) => (
              <article key={lugar.id} style={{ alignItems: 'flex-start', borderBottom: '0.5px solid var(--border)', display: 'flex', gap: '16px', padding: '16px 0' }}>
                <FramedPainting src={lugar.imagen_url} alt={lugar.nombre} width={64} height={64} tone="pastoral" />
                <div style={{ flex: 1 }}>
                  <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '5px' }}>{lugar.categoria}</p>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{lugar.nombre}</h3>
                  <p style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{lugar.descripcion}</p>
                </div>
                <button className="btn-ghost" onClick={() => eliminarLugar(lugar)} style={{ padding: '8px 10px' }}>Eliminar</button>
              </article>
            ))}
          </div>
          <form onSubmit={agregarLugar} style={{ borderTop: '0.5px solid var(--border)', paddingTop: '22px' }}>
            <p className="editorial-lbl" style={{ marginBottom: '16px' }}>Agregar lugar</p>
            <div style={gridFormStyle}>
              <label className="editorial-lbl">Nombre<input required className="input" value={lugarForm.nombre} onChange={(e) => setLugarForm((prev) => ({ ...prev, nombre: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Descripción<input required className="input" value={lugarForm.descripcion} onChange={(e) => setLugarForm((prev) => ({ ...prev, descripcion: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Categoría<input required className="input" value={lugarForm.categoria} onChange={(e) => setLugarForm((prev) => ({ ...prev, categoria: e.target.value }))} style={inputStyle} /></label>
              <label className="editorial-lbl">Subir imagen<input required type="file" accept="image/*" className="input" onChange={(e) => setLugarForm((prev) => ({ ...prev, archivo: e.target.files?.[0] ?? null }))} style={inputStyle} /></label>
            </div>
            {lugarPreview && (
              <div style={{ marginTop: '18px', maxWidth: '220px' }}>
                <p className="editorial-lbl" style={{ marginBottom: '8px' }}>Preview</p>
                <img src={lugarPreview} alt="Preview del lugar recomendado" style={{ display: 'block', height: '140px', objectFit: 'cover', width: '100%' }} />
              </div>
            )}
            <button className="btn-red" type="submit" style={{ marginTop: '18px' }}>Guardar</button>
          </form>
        </section>
      </div>
    </section>
  )
}

function completarSieteCapitulos(capitulos: CapituloAdmin[]) {
  return Array.from({ length: 7 }, (_, index) => capitulos[index] ?? {
    id: `local-capitulo-${index}`,
    titulo: `Capítulo ${index + 1}`,
    texto: '',
    orden: index,
  })
}
