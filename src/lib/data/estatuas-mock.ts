// Datos de muestra: estatuas de Villa San Lorenzo, Córdoba.
// Se usan cuando no hay conexión a Supabase configurada.

import { Estatua } from '@/types'

export const ESTATUAS_MOCK: Estatua[] = [
  {
    id: '1',
    slug: 'cura-brochero',
    nombre: 'Cura Brochero',
    subtitulo: 'Santo de los Caminos · 1840-1914',
    frase: 'La religión no se predica, se vive.',
    audio_url: null,
    activa: true,
    orden: 1,
    visitas: 214,
    created_at: new Date().toISOString(),
    capitulos: [
      {
        titulo: 'Sus Orígenes',
        texto:
          'José Gabriel Brochero nació el 16 de marzo de 1840 en Santa Rosa de Río Primero, Córdoba. Desde joven sintió el llamado del sacerdocio con una claridad que contrastaba con la comodidad que su familia podría haberle ofrecido.',
      },
      {
        titulo: 'Los Caminos de las Sierras',
        texto:
          'A lomo de mula, Brochero recorrió durante décadas los laberintos de las sierras cordobesas. Construyó capillas donde no había refugio, acequias donde no había agua, y escuelas donde no había futuro.',
      },
      {
        titulo: 'El Hombre del Pueblo',
        texto:
          'Brochero no hablaba desde el púlpito hacia abajo: hablaba de igual a igual, con el vocabulario del trabajador y la franqueza del amigo. Su cercanía hizo que cada familia lo sintiera propio.',
      },
      {
        titulo: 'Su Legado',
        texto:
          'El 16 de octubre de 2016, el Papa Francisco canonizó a José Gabriel Brochero en la Plaza de San Pedro. Se convirtió en el primer santo argentino nacido en suelo nacional.',
      },
      {
        titulo: 'Su Fe en Acción',
        texto:
          'Su fe no se quedó en palabras. Abrió caminos, levantó espacios de encuentro y acompañó a los más olvidados con una energía práctica, concreta y profundamente popular.',
      },
      {
        titulo: 'La Lepra y el Sacrificio',
        texto:
          'Cuando la enfermedad golpeó a su comunidad, Brochero eligió quedarse cerca. La lepra marcó su cuerpo, pero no apagó su modo de escuchar, recibir y consolar.',
      },
      {
        titulo: 'El Camino a la Santidad',
        texto:
          'Su santidad nació del camino cotidiano: polvo, mula, oración y obra pública. Por eso su figura sigue hablando con una humildad que atraviesa generaciones.',
      },
    ],
    imagenes: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        titulo: 'Sierras al Atardecer',
        descripcion: 'Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.',
        categoria: 'Paisaje',
      },
      {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        titulo: 'Caminos de Altura',
        descripcion: 'Senderos de montaña por donde llevaba la fe a los más aislados.',
        categoria: 'Naturaleza',
      },
      {
        url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        titulo: 'Cielo de Córdoba',
        descripcion: 'El cielo abierto de Córdoba, testigo silencioso de sus travesías.',
        categoria: 'Paisaje',
      },
      {
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
        titulo: 'Sendero de las Sierras',
        descripcion: 'Un camino rural como los que Brochero transitó para llegar a cada familia.',
        categoria: 'Patrimonio',
      },
      {
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        titulo: 'Monte Serrano',
        descripcion: 'Vegetación serrana junto a los caminos históricos del valle.',
        categoria: 'Naturaleza',
      },
      {
        url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80',
        titulo: 'Camino de Tierra',
        descripcion: 'El polvo del camino como memoria de viaje, fe y encuentro.',
        categoria: 'Historia',
      },
      {
        url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80',
        titulo: 'Luz entre Árboles',
        descripcion: 'La luz baja de la tarde sobre el monte cordobés.',
        categoria: 'Paisaje',
      },
      {
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
        titulo: 'Casa Serrana',
        descripcion: 'Arquitectura simple de pueblo, cercana al paisaje y a la memoria.',
        categoria: 'Patrimonio',
      },
    ],
    lugares: [
      {
        nombre: 'Capilla Brochero',
        descripcion: 'Un espacio de devoción ligado a su memoria y a la religiosidad serrana.',
        categoria: 'Patrimonio Religioso',
      },
      {
        nombre: 'Camino de las Sierras',
        descripcion: 'El trayecto que recuerda sus recorridas a mula por comunidades alejadas.',
        categoria: 'Naturaleza',
      },
      {
        nombre: 'Escuela Histórica',
        descripcion: 'Un símbolo de su empeño por llevar educación donde no llegaba el Estado.',
        categoria: 'Educación',
      },
      {
        nombre: 'Acequia del Cura',
        descripcion: 'Memoria del agua compartida y de las obras que mejoraron la vida del pueblo.',
        categoria: 'Obra Comunitaria',
      },
    ],
  },
  {
    id: '2',
    slug: 'san-lorenzo',
    nombre: 'San Lorenzo',
    subtitulo: 'Patrono del Pueblo · Mártir Romano',
    frase: 'Dame la gracia de saber sufrir.',
    audio_url: null,
    activa: true,
    orden: 2,
    visitas: 178,
    created_at: new Date().toISOString(),
    capitulos: [
      {
        titulo: 'El Imperio Romano',
        texto:
          'El siglo III fue uno de los más convulsionados de Roma. El Imperio se desangraba en guerras civiles y la religión cristiana era perseguida con intermitencias crueles.',
      },
      {
        titulo: 'El Diácono Valiente',
        texto:
          'Lorenzo administraba los bienes de la Iglesia y los distribuía entre los pobres. Cuando exigieron sus tesoros, señaló a los enfermos y marginados como la verdadera riqueza.',
      },
      {
        titulo: 'El Martirio',
        texto:
          'El 10 de agosto del año 258, Lorenzo fue condenado a morir sobre una parrilla de hierro. La tradición conserva su serenidad y su valentía frente al suplicio.',
      },
      {
        titulo: 'Su Nombre en el Pueblo',
        texto:
          'Villa San Lorenzo tomó su nombre de este mártir romano cuando los primeros pobladores eligieron a un patrono para la naciente comunidad.',
      },
      {
        titulo: 'Su Devoción',
        texto:
          'La devoción a San Lorenzo se volvió una forma de identidad comunitaria. Su figura acompaña celebraciones, procesiones y recuerdos familiares del pueblo.',
      },
      {
        titulo: 'El Fuego de la Fe',
        texto:
          'El fuego de su martirio se transformó en símbolo de resistencia espiritual: una fe que no se consume, sino que ilumina a quienes la reciben.',
      },
      {
        titulo: 'Su Nombre en América',
        texto:
          'Su nombre cruzó mares y siglos. En América quedó unido a pueblos, iglesias y plazas que encontraron en su historia una imagen de entrega y protección.',
      },
    ],
    imagenes: [
      {
        url: 'https://images.unsplash.com/photo-1548017787-4c8789c9e59a?w=800&q=80',
        titulo: 'Arquitectura Colonial',
        descripcion: 'La arquitectura colonial que acompaña la historia del pueblo desde su fundación.',
        categoria: 'Patrimonio',
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
        titulo: 'Cielo Dramático',
        descripcion: 'Los cielos abiertos de la región, herederos de una memoria antigua.',
        categoria: 'Paisaje',
      },
      {
        url: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80',
        titulo: 'Luz de Velas',
        descripcion: 'La luz votiva que acompaña la devoción popular al mártir romano.',
        categoria: 'Devoción',
      },
      {
        url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
        titulo: 'Piedra Antigua',
        descripcion: 'La piedra trabajada evoca la Roma del siglo III donde Lorenzo eligió su destino.',
        categoria: 'Historia',
      },
      {
        url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80',
        titulo: 'Muro Antiguo',
        descripcion: 'Texturas de piedra que recuerdan la permanencia de la historia.',
        categoria: 'Patrimonio',
      },
      {
        url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
        titulo: 'Verde del Valle',
        descripcion: 'El paisaje que rodea la vida cotidiana de Villa San Lorenzo.',
        categoria: 'Naturaleza',
      },
      {
        url: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&q=80',
        titulo: 'Luz sobre Adobe',
        descripcion: 'Una escena cálida de arquitectura simple y memoria local.',
        categoria: 'Historia',
      },
      {
        url: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&q=80',
        titulo: 'Papel de Archivo',
        descripcion: 'La textura del documento como huella de una memoria conservada.',
        categoria: 'Archivo',
      },
    ],
    lugares: [
      {
        nombre: 'Iglesia San Lorenzo',
        descripcion: 'El edificio histórico del pueblo, epicentro de la devoción al mártir romano.',
        categoria: 'Patrimonio Religioso',
      },
      {
        nombre: 'Plaza Central',
        descripcion: 'El corazón cívico de Villa San Lorenzo desde su fundación.',
        categoria: 'Espacio Público',
      },
      {
        nombre: 'Capilla Colonial',
        descripcion: 'Un rincón de oración que conserva la escala íntima de los primeros templos.',
        categoria: 'Patrimonio',
      },
      {
        nombre: 'Gruta del Santo',
        descripcion: 'Lugar de pausa y recogimiento asociado a la devoción popular.',
        categoria: 'Devoción',
      },
    ],
  },
]

// Obtiene la siguiente estatua en el recorrido circular.
export function getSiguienteEstatua(slugActual: string): Estatua | null {
  const idx = ESTATUAS_MOCK.findIndex((e) => e.slug === slugActual)
  if (idx === -1) return null
  return ESTATUAS_MOCK[(idx + 1) % ESTATUAS_MOCK.length]
}
