import 'server-only'

// Funciones de consulta a Supabase para Server Components.
// Si las variables de entorno no están configuradas, se usan datos mock sin romper la app.

import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'
import { Estatua, EstatuaImagen, Lugar } from '@/types'
import { createClient } from './server'

export interface GaleriaItem extends EstatuaImagen {
  id: string
  orden?: number
}

export interface LugarPueblo extends Lugar {
  id: string
  imagen_url: string | null
  orden?: number
}

export interface AdminDashboardData {
  estatuas: Estatua[]
  totalImagenes: number
  totalVisitas: number
}

function supabaseConfigurado(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getEstatua(slug: string): Promise<Estatua | null> {
  const mock = ESTATUAS_MOCK.find((e) => e.slug === slug) ?? null

  if (!supabaseConfigurado()) {
    return mock
  }

  try {
    const supabase = await createClient()
    if (!supabase) return mock

    const { data: estatua, error } = await supabase
      .from('estatuas')
      .select(`
        *,
        capitulos(*),
        imagenes:estatua_imagenes(*),
        lugares(*)
      `)
      .eq('slug', slug)
      .eq('activa', true)
      .single()

    if (error || !estatua) return mock
    return completarEstatuaConFallback(estatua as Estatua, mock)
  } catch (err) {
    console.error('[getEstatua] Error al consultar Supabase:', err)
    return mock
  }
}

export async function getTodasEstatuas(): Promise<Estatua[]> {
  if (!supabaseConfigurado()) {
    return ESTATUAS_MOCK
  }

  try {
    const supabase = await createClient()
    if (!supabase) return ESTATUAS_MOCK

    const { data, error } = await supabase
      .from('estatuas')
      .select(`
        *,
        capitulos(*),
        imagenes:estatua_imagenes(*),
        lugares(*)
      `)
      .eq('activa', true)
      .order('orden', { ascending: true })

    if (error || !data?.length) return ESTATUAS_MOCK
    return (data as Estatua[]).map((estatua) => {
      const mock = ESTATUAS_MOCK.find((item) => item.slug === estatua.slug) ?? null
      return completarEstatuaConFallback(estatua, mock)
    })
  } catch (err) {
    console.error('[getTodasEstatuas] Error al consultar Supabase:', err)
    return ESTATUAS_MOCK
  }
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const emptyData = {
    estatuas: [],
    totalImagenes: 0,
    totalVisitas: 0,
  }

  if (!supabaseConfigurado()) {
    return emptyData
  }

  try {
    const supabase = await createClient()
    if (!supabase) return emptyData

    const { data, error } = await supabase
      .from('estatuas')
      .select(`
        *,
        capitulos(*),
        imagenes:estatua_imagenes(*),
        lugares(*)
      `)
      .order('orden', { ascending: true })

    if (error || !data) return emptyData

    const estatuas = (data as Estatua[]).map((estatua) => ({
      ...estatua,
      capitulos: ordenarPorOrden(estatua.capitulos),
      imagenes: ordenarPorOrden(estatua.imagenes),
      lugares: ordenarPorOrden(estatua.lugares),
    }))

    return {
      estatuas,
      totalImagenes: estatuas.reduce((acc, estatua) => acc + estatua.imagenes.length, 0),
      totalVisitas: estatuas.reduce((acc, estatua) => acc + estatua.visitas, 0),
    }
  } catch (err) {
    console.error('[getAdminDashboardData] Error al consultar Supabase:', err)
    return emptyData
  }
}

export async function getSiguienteEstatuaPublica(slugActual: string): Promise<Estatua | null> {
  const estatuas = await getTodasEstatuas()
  const index = estatuas.findIndex((estatua) => estatua.slug === slugActual)

  if (index === -1 || !estatuas.length) return null

  return estatuas[(index + 1) % estatuas.length]
}

export async function getGaleriaPublica(): Promise<GaleriaItem[]> {
  if (!supabaseConfigurado()) return getGaleriaMock()

  try {
    const supabase = await createClient()
    if (!supabase) return getGaleriaMock()

    const { data, error } = await supabase
      .from('galeria')
      .select('*')
      .order('orden', { ascending: true })

    if (error || !data?.length) return getGaleriaMock()

    return data.map((item) => ({
      id: String(item.id),
      url: item.url,
      titulo: item.titulo,
      descripcion: item.descripcion,
      categoria: item.categoria,
      orden: item.orden,
    }))
  } catch (err) {
    console.error('[getGaleriaPublica] Error al consultar Supabase:', err)
    return getGaleriaMock()
  }
}

export async function getLugaresPueblo(): Promise<LugarPueblo[]> {
  if (!supabaseConfigurado()) return getLugaresPuebloMock()

  try {
    const supabase = await createClient()
    if (!supabase) return getLugaresPuebloMock()

    const { data, error } = await supabase
      .from('lugares_pueblo')
      .select('*')
      .order('orden', { ascending: true })

    if (error || !data?.length) return getLugaresPuebloMock()

    return data.map((item) => ({
      id: String(item.id),
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.categoria,
      imagen_url: item.imagen_url ?? null,
      orden: item.orden,
    }))
  } catch (err) {
    console.error('[getLugaresPueblo] Error al consultar Supabase:', err)
    return getLugaresPuebloMock()
  }
}

function completarEstatuaConFallback(estatua: Estatua, mock: Estatua | null): Estatua {
  return {
    ...estatua,
    capitulos: ordenarPorOrden(estatua.capitulos).length ? ordenarPorOrden(estatua.capitulos) : mock?.capitulos ?? [],
    imagenes: ordenarPorOrden(estatua.imagenes).length ? ordenarPorOrden(estatua.imagenes) : mock?.imagenes ?? [],
    lugares: ordenarPorOrden(estatua.lugares).length ? ordenarPorOrden(estatua.lugares) : mock?.lugares ?? [],
  }
}

function ordenarPorOrden<T>(items: T[] | null | undefined): T[] {
  return [...(items ?? [])].sort((a, b) => {
    const ordenA = typeof (a as { orden?: unknown }).orden === 'number' ? (a as { orden: number }).orden : 0
    const ordenB = typeof (b as { orden?: unknown }).orden === 'number' ? (b as { orden: number }).orden : 0
    return ordenA - ordenB
  })
}

function getGaleriaMock(): GaleriaItem[] {
  return ESTATUAS_MOCK.flatMap((estatua) => estatua.imagenes)
    .slice(0, 8)
    .map((item, index) => ({ id: `mock-galeria-${index}`, ...item, orden: index }))
}

function getLugaresPuebloMock(): LugarPueblo[] {
  return ESTATUAS_MOCK.flatMap((estatua) => estatua.lugares)
    .slice(0, 6)
    .map((item, index) => ({
      id: `mock-lugar-pueblo-${index}`,
      ...item,
      imagen_url: null,
      orden: index,
    }))
}
