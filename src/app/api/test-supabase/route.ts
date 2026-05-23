import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return Response.json({
      error: 'Variables de entorno no configuradas',
      url: url ? 'OK' : 'FALTA',
      key: key ? 'OK' : 'FALTA',
    })
  }

  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('estatuas')
      .select('nombre')

    if (error) {
      return Response.json({ error: error.message, url })
    }

    return Response.json({
      status: 'OK',
      url,
      tablas: [
        'estatuas',
        'capitulos',
        'estatua_imagenes',
        'lugares',
        'galeria',
        'lugares_pueblo',
      ],
      data,
    })
  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : 'Error desconocido',
      url,
    })
  }
}
