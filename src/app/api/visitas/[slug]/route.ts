import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RouteProps {
  params: Promise<{ slug: string }>
}

export async function POST(_request: Request, { params }: RouteProps) {
  const { slug } = await params
  const supabase = await createClient()

  if (!supabase) {
    return NextResponse.json({ ok: true, mock: true })
  }

  const { data: estatua, error: selectError } = await supabase
    .from('estatuas')
    .select('id, visitas')
    .eq('slug', slug)
    .single()

  if (selectError || !estatua) {
    return NextResponse.json({ error: 'No se encontró la estatua.' }, { status: 404 })
  }

  const { error: updateError } = await supabase
    .from('estatuas')
    .update({ visitas: (estatua.visitas ?? 0) + 1 })
    .eq('id', estatua.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
