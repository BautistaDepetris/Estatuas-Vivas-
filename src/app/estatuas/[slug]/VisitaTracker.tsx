'use client'

// Componente client-side que incrementa el contador de visitas sin bloquear el render
// Se monta en el cliente y llama a la API de visitas en background

import { useEffect } from 'react'
import { incrementarVisitas } from '@/lib/supabase/client-queries'

export default function VisitaTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // Registrar visita de forma silenciosa
    incrementarVisitas(slug)
  }, [slug])

  // No renderiza nada visible
  return null
}
