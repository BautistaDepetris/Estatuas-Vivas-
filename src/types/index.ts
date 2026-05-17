// Tipos principales del proyecto Estatuas Vivas — Villa San Lorenzo

export interface Capitulo {
  titulo: string
  texto: string
}

export interface EstatuaImagen {
  url: string
  titulo: string
  descripcion: string
  categoria: string
}

export interface Lugar {
  nombre: string
  descripcion: string
  categoria: string
}

export interface Estatua {
  id: string
  slug: string
  nombre: string
  subtitulo: string
  capitulos: Capitulo[]
  frase: string
  imagenes: EstatuaImagen[]
  audio_url: string | null
  lugares: Lugar[]
  activa: boolean
  orden: number
  visitas: number
  created_at: string
}
