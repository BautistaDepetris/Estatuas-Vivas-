import 'server-only'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from './url'

// Cliente de Supabase para Server Components.
// Si faltan variables de entorno, devuelve null para permitir builds con datos mock.

export async function createClient() {
  const config = getSupabaseConfig()

  if (!config) {
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // setAll puede fallar en Server Components de solo lectura; es seguro ignorarlo.
        }
      },
    },
  })
}
