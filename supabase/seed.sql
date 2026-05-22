-- Seed inicial para Estatuas Vivas.
-- Idempotente: se puede ejecutar varias veces sin duplicar filas generadas por este archivo.

alter table lugares add column if not exists imagen_url text;

with seed_estatuas(id, slug, nombre, subtitulo, frase, audio_url, activa, orden, visitas) as (
  values
    ('11111111-1111-1111-1111-111111111111'::uuid, 'cura-brochero', 'Cura Brochero', 'Santo de los Caminos · 1840-1914', 'La religión no se predica, se vive.', null, true, 1, 214),
    ('22222222-2222-2222-2222-222222222222'::uuid, 'san-lorenzo', 'San Lorenzo', 'Patrono del Pueblo · Mártir Romano', 'Dame la gracia de saber sufrir.', null, true, 2, 178)
)
insert into estatuas (id, slug, nombre, subtitulo, frase, audio_url, activa, orden, visitas)
select id, slug, nombre, subtitulo, frase, audio_url, activa, orden, visitas
from seed_estatuas
on conflict (slug) do nothing;

with estatua_refs as (
  select id, slug from estatuas where slug in ('cura-brochero', 'san-lorenzo')
), seed_capitulos(id, slug, titulo, texto, orden) as (
  values
    ('11111111-0001-0000-0000-000000000001'::uuid, 'cura-brochero', 'Sus Orígenes', 'José Gabriel Brochero nació el 16 de marzo de 1840 en Santa Rosa de Río Primero, Córdoba. Desde joven sintió el llamado del sacerdocio con una claridad que contrastaba con la comodidad que su familia podría haberle ofrecido.', 0),
    ('11111111-0001-0000-0000-000000000002'::uuid, 'cura-brochero', 'Los Caminos de las Sierras', 'A lomo de mula, Brochero recorrió durante décadas los laberintos de las sierras cordobesas. Construyó capillas donde no había refugio, acequias donde no había agua, y escuelas donde no había futuro.', 1),
    ('11111111-0001-0000-0000-000000000003'::uuid, 'cura-brochero', 'El Hombre del Pueblo', 'Brochero no hablaba desde el púlpito hacia abajo: hablaba de igual a igual, con el vocabulario del trabajador y la franqueza del amigo. Su cercanía hizo que cada familia lo sintiera propio.', 2),
    ('11111111-0001-0000-0000-000000000004'::uuid, 'cura-brochero', 'Su Legado', 'El 16 de octubre de 2016, el Papa Francisco canonizó a José Gabriel Brochero en la Plaza de San Pedro. Se convirtió en el primer santo argentino nacido en suelo nacional.', 3),
    ('11111111-0001-0000-0000-000000000005'::uuid, 'cura-brochero', 'Su Fe en Acción', 'Su fe no se quedó en palabras. Abrió caminos, levantó espacios de encuentro y acompañó a los más olvidados con una energía práctica, concreta y profundamente popular.', 4),
    ('11111111-0001-0000-0000-000000000006'::uuid, 'cura-brochero', 'La Lepra y el Sacrificio', 'Cuando la enfermedad golpeó a su comunidad, Brochero eligió quedarse cerca. La lepra marcó su cuerpo, pero no apagó su modo de escuchar, recibir y consolar.', 5),
    ('11111111-0001-0000-0000-000000000007'::uuid, 'cura-brochero', 'El Camino a la Santidad', 'Su santidad nació del camino cotidiano: polvo, mula, oración y obra pública. Por eso su figura sigue hablando con una humildad que atraviesa generaciones.', 6),
    ('22222222-0001-0000-0000-000000000001'::uuid, 'san-lorenzo', 'El Imperio Romano', 'El siglo III fue uno de los más convulsionados de Roma. El Imperio se desangraba en guerras civiles y la religión cristiana era perseguida con intermitencias crueles.', 0),
    ('22222222-0001-0000-0000-000000000002'::uuid, 'san-lorenzo', 'El Diácono Valiente', 'Lorenzo administraba los bienes de la Iglesia y los distribuía entre los pobres. Cuando exigieron sus tesoros, señaló a los enfermos y marginados como la verdadera riqueza.', 1),
    ('22222222-0001-0000-0000-000000000003'::uuid, 'san-lorenzo', 'El Martirio', 'El 10 de agosto del año 258, Lorenzo fue condenado a morir sobre una parrilla de hierro. La tradición conserva su serenidad y su valentía frente al suplicio.', 2),
    ('22222222-0001-0000-0000-000000000004'::uuid, 'san-lorenzo', 'Su Nombre en el Pueblo', 'Villa San Lorenzo tomó su nombre de este mártir romano cuando los primeros pobladores eligieron a un patrono para la naciente comunidad.', 3),
    ('22222222-0001-0000-0000-000000000005'::uuid, 'san-lorenzo', 'Su Devoción', 'La devoción a San Lorenzo se volvió una forma de identidad comunitaria. Su figura acompaña celebraciones, procesiones y recuerdos familiares del pueblo.', 4),
    ('22222222-0001-0000-0000-000000000006'::uuid, 'san-lorenzo', 'El Fuego de la Fe', 'El fuego de su martirio se transformó en símbolo de resistencia espiritual: una fe que no se consume, sino que ilumina a quienes la reciben.', 5),
    ('22222222-0001-0000-0000-000000000007'::uuid, 'san-lorenzo', 'Su Nombre en América', 'Su nombre cruzó mares y siglos. En América quedó unido a pueblos, iglesias y plazas que encontraron en su historia una imagen de entrega y protección.', 6)
)
insert into capitulos (id, estatua_id, titulo, texto, orden)
select seed_capitulos.id, estatua_refs.id, seed_capitulos.titulo, seed_capitulos.texto, seed_capitulos.orden
from seed_capitulos
join estatua_refs on estatua_refs.slug = seed_capitulos.slug
on conflict (id) do nothing;

with estatua_refs as (
  select id, slug from estatuas where slug in ('cura-brochero', 'san-lorenzo')
), seed_imagenes(id, slug, url, titulo, descripcion, categoria, orden) as (
  values
    ('11111111-0002-0000-0000-000000000001'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', 'Sierras al Atardecer', 'Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.', 'Paisaje', 0),
    ('11111111-0002-0000-0000-000000000002'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'Caminos de Altura', 'Senderos de montaña por donde llevaba la fe a los más aislados.', 'Naturaleza', 1),
    ('11111111-0002-0000-0000-000000000003'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', 'Cielo de Córdoba', 'El cielo abierto de Córdoba, testigo silencioso de sus travesías.', 'Paisaje', 2),
    ('11111111-0002-0000-0000-000000000004'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', 'Sendero de las Sierras', 'Un camino rural como los que Brochero transitó para llegar a cada familia.', 'Patrimonio', 3),
    ('11111111-0002-0000-0000-000000000005'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', 'Monte Serrano', 'Vegetación serrana junto a los caminos históricos del valle.', 'Naturaleza', 4),
    ('11111111-0002-0000-0000-000000000006'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80', 'Camino de Tierra', 'El polvo del camino como memoria de viaje, fe y encuentro.', 'Historia', 5),
    ('11111111-0002-0000-0000-000000000007'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80', 'Luz entre Árboles', 'La luz baja de la tarde sobre el monte cordobés.', 'Paisaje', 6),
    ('11111111-0002-0000-0000-000000000008'::uuid, 'cura-brochero', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80', 'Casa Serrana', 'Arquitectura simple de pueblo, cercana al paisaje y a la memoria.', 'Patrimonio', 7),
    ('22222222-0002-0000-0000-000000000001'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1548017787-4c8789c9e59a?w=800&q=80', 'Arquitectura Colonial', 'La arquitectura colonial que acompaña la historia del pueblo desde su fundación.', 'Patrimonio', 0),
    ('22222222-0002-0000-0000-000000000002'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', 'Cielo Dramático', 'Los cielos abiertos de la región, herederos de una memoria antigua.', 'Paisaje', 1),
    ('22222222-0002-0000-0000-000000000003'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80', 'Luz de Velas', 'La luz votiva que acompaña la devoción popular al mártir romano.', 'Devoción', 2),
    ('22222222-0002-0000-0000-000000000004'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80', 'Piedra Antigua', 'La piedra trabajada evoca la Roma del siglo III donde Lorenzo eligió su destino.', 'Historia', 3),
    ('22222222-0002-0000-0000-000000000005'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80', 'Muro Antiguo', 'Texturas de piedra que recuerdan la permanencia de la historia.', 'Patrimonio', 4),
    ('22222222-0002-0000-0000-000000000006'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80', 'Verde del Valle', 'El paisaje que rodea la vida cotidiana de Villa San Lorenzo.', 'Naturaleza', 5),
    ('22222222-0002-0000-0000-000000000007'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?w=800&q=80', 'Luz sobre Adobe', 'Una escena cálida de arquitectura simple y memoria local.', 'Historia', 6),
    ('22222222-0002-0000-0000-000000000008'::uuid, 'san-lorenzo', 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&q=80', 'Papel de Archivo', 'La textura del documento como huella de una memoria conservada.', 'Archivo', 7)
)
insert into estatua_imagenes (id, estatua_id, url, titulo, descripcion, categoria, orden)
select seed_imagenes.id, estatua_refs.id, seed_imagenes.url, seed_imagenes.titulo, seed_imagenes.descripcion, seed_imagenes.categoria, seed_imagenes.orden
from seed_imagenes
join estatua_refs on estatua_refs.slug = seed_imagenes.slug
on conflict (id) do nothing;

with estatua_refs as (
  select id, slug from estatuas where slug in ('cura-brochero', 'san-lorenzo')
), seed_lugares(id, slug, nombre, descripcion, categoria, imagen_url, orden) as (
  values
    ('11111111-0003-0000-0000-000000000001'::uuid, 'cura-brochero', 'Capilla Brochero', 'Un espacio de devoción ligado a su memoria y a la religiosidad serrana.', 'Patrimonio Religioso', null, 0),
    ('11111111-0003-0000-0000-000000000002'::uuid, 'cura-brochero', 'Camino de las Sierras', 'El trayecto que recuerda sus recorridas a mula por comunidades alejadas.', 'Naturaleza', null, 1),
    ('11111111-0003-0000-0000-000000000003'::uuid, 'cura-brochero', 'Escuela Histórica', 'Un símbolo de su empeño por llevar educación donde no llegaba el Estado.', 'Educación', null, 2),
    ('11111111-0003-0000-0000-000000000004'::uuid, 'cura-brochero', 'Acequia del Cura', 'Memoria del agua compartida y de las obras que mejoraron la vida del pueblo.', 'Obra Comunitaria', null, 3),
    ('22222222-0003-0000-0000-000000000001'::uuid, 'san-lorenzo', 'Iglesia San Lorenzo', 'El edificio histórico del pueblo, epicentro de la devoción al mártir romano.', 'Patrimonio Religioso', null, 0),
    ('22222222-0003-0000-0000-000000000002'::uuid, 'san-lorenzo', 'Plaza Central', 'El corazón cívico de Villa San Lorenzo desde su fundación.', 'Espacio Público', null, 1),
    ('22222222-0003-0000-0000-000000000003'::uuid, 'san-lorenzo', 'Capilla Colonial', 'Un rincón de oración que conserva la escala íntima de los primeros templos.', 'Patrimonio', null, 2),
    ('22222222-0003-0000-0000-000000000004'::uuid, 'san-lorenzo', 'Gruta del Santo', 'Lugar de pausa y recogimiento asociado a la devoción popular.', 'Devoción', null, 3)
)
insert into lugares (id, estatua_id, nombre, descripcion, categoria, imagen_url, orden)
select seed_lugares.id, estatua_refs.id, seed_lugares.nombre, seed_lugares.descripcion, seed_lugares.categoria, seed_lugares.imagen_url, seed_lugares.orden
from seed_lugares
join estatua_refs on estatua_refs.slug = seed_lugares.slug
on conflict (id) do nothing;

with seed_galeria(id, url, titulo, descripcion, categoria, orden) as (
  values
    ('33333333-0001-0000-0000-000000000001'::uuid, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', 'Sierras al Atardecer', 'Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.', 'Paisaje', 0),
    ('33333333-0001-0000-0000-000000000002'::uuid, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', 'Caminos de Altura', 'Senderos de montaña por donde llevaba la fe a los más aislados.', 'Naturaleza', 1),
    ('33333333-0001-0000-0000-000000000003'::uuid, 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', 'Cielo de Córdoba', 'El cielo abierto de Córdoba, testigo silencioso de sus travesías.', 'Paisaje', 2),
    ('33333333-0001-0000-0000-000000000004'::uuid, 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80', 'Sendero de las Sierras', 'Un camino rural como los que Brochero transitó para llegar a cada familia.', 'Patrimonio', 3),
    ('33333333-0001-0000-0000-000000000005'::uuid, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', 'Monte Serrano', 'Vegetación serrana junto a los caminos históricos del valle.', 'Naturaleza', 4),
    ('33333333-0001-0000-0000-000000000006'::uuid, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80', 'Camino de Tierra', 'El polvo del camino como memoria de viaje, fe y encuentro.', 'Historia', 5),
    ('33333333-0001-0000-0000-000000000007'::uuid, 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&q=80', 'Luz entre Árboles', 'La luz baja de la tarde sobre el monte cordobés.', 'Paisaje', 6),
    ('33333333-0001-0000-0000-000000000008'::uuid, 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80', 'Casa Serrana', 'Arquitectura simple de pueblo, cercana al paisaje y a la memoria.', 'Patrimonio', 7)
)
insert into galeria (id, url, titulo, descripcion, categoria, orden)
select id, url, titulo, descripcion, categoria, orden
from seed_galeria
on conflict (id) do nothing;

with seed_lugares_pueblo(id, nombre, descripcion, categoria, imagen_url, orden) as (
  values
    ('44444444-0001-0000-0000-000000000001'::uuid, 'Capilla Brochero', 'Un espacio de devoción ligado a su memoria y a la religiosidad serrana.', 'Patrimonio Religioso', null, 0),
    ('44444444-0001-0000-0000-000000000002'::uuid, 'Camino de las Sierras', 'El trayecto que recuerda sus recorridas a mula por comunidades alejadas.', 'Naturaleza', null, 1),
    ('44444444-0001-0000-0000-000000000003'::uuid, 'Escuela Histórica', 'Un símbolo de su empeño por llevar educación donde no llegaba el Estado.', 'Educación', null, 2),
    ('44444444-0001-0000-0000-000000000004'::uuid, 'Acequia del Cura', 'Memoria del agua compartida y de las obras que mejoraron la vida del pueblo.', 'Obra Comunitaria', null, 3),
    ('44444444-0001-0000-0000-000000000005'::uuid, 'Iglesia San Lorenzo', 'El edificio histórico del pueblo, epicentro de la devoción al mártir romano.', 'Patrimonio Religioso', null, 4),
    ('44444444-0001-0000-0000-000000000006'::uuid, 'Plaza Central', 'El corazón cívico de Villa San Lorenzo desde su fundación.', 'Espacio Público', null, 5)
)
insert into lugares_pueblo (id, nombre, descripcion, categoria, imagen_url, orden)
select id, nombre, descripcion, categoria, imagen_url, orden
from seed_lugares_pueblo
on conflict (id) do nothing;
