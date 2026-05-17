// Funciones de consulta a Supabase
// Si las variables de entorno no están configuradas, se usan datos mock sin romper la app

import { Estatua } from '@/types'
import { ESTATUAS_MOCK } from '@/lib/data/estatuas-mock'

function supabaseConfigurado(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function getEstatua(slug: string): Promise<Estatua | null> {
  if (!supabaseConfigurado()) {
    return ESTATUAS_MOCK.find((e) => e.slug === slug) ?? null
  }

  try {
    const { createClient } = await import('./server')
    const supabase = await createClient()

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

    if (error || !estatua) return null
    return estatua as Estatua
  } catch (err) {
    console.error('[getEstatua] Error al consultar Supabase:', err)
    return ESTATUAS_MOCK.find((e) => e.slug === slug) ?? null
  }
}

export async function getTodasEstatuas(): Promise<Estatua[]> {
  if (!supabaseConfigurado()) {
    return ESTATUAS_MOCK
  }

  try {
    const { createClient } = await import('./server')
    const supabase = await createClient()

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

    if (error || !data) return ESTATUAS_MOCK
    return data as Estatua[]
  } catch (err) {
    console.error('[getTodasEstatuas] Error al consultar Supabase:', err)
    return ESTATUAS_MOCK
  }
}

export async function incrementarVisitas(slug: string): Promise<void> {
  if (!supabaseConfigurado()) {
    console.log(`[mock] Visita registrada para: ${slug}`)
    return
  }

  try {
    const response = await fetch(`/api/visitas/${slug}`, { method: 'POST' })
    if (!response.ok) {
      console.warn(`[incrementarVisitas] No se pudo registrar visita para ${slug}`)
    }
  } catch (err) {
    console.warn('[incrementarVisitas] Error silencioso:', err)
  }
}
