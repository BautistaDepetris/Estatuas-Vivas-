'use client'

// Funciones seguras para Client Components.
// No importan server.ts, queries.ts ni next/headers.

import { getSupabaseConfig } from './url'

function supabaseConfigurado(): boolean {
  return !!getSupabaseConfig()
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
