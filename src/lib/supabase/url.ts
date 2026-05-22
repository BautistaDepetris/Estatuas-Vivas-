export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return {
    supabaseUrl: normalizarSupabaseUrl(supabaseUrl),
    supabaseAnonKey,
  }
}

function normalizarSupabaseUrl(rawUrl: string) {
  const trimmedUrl = rawUrl.trim()

  try {
    const url = new URL(trimmedUrl)
    return url.origin
  } catch {
    return trimmedUrl.replace(/\/+(rest|storage)\/v1.*$/, '').replace(/\/+$/, '')
  }
}
