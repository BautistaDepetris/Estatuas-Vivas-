// Cliente de Supabase para componentes del lado del cliente (Client Components)
// Solo se usa en componentes con "use client"

import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseConfig } from './url'

export function createClient() {
  const config = getSupabaseConfig()

  if (!config) {
    return null
  }

  return createBrowserClient(config.supabaseUrl, config.supabaseAnonKey)
}
