-- Schema de Supabase para Estatuas Vivas -- Villa San Lorenzo
-- Ejecutar en el editor SQL de Supabase

create table estatuas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  subtitulo text,
  frase text,
  audio_url text,
  activa boolean default true,
  orden int default 0,
  visitas int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table capitulos (
  id uuid primary key default gen_random_uuid(),
  estatua_id uuid references estatuas(id) on delete cascade,
  titulo text not null,
  texto text not null,
  orden int default 0
);

create table estatua_imagenes (
  id uuid primary key default gen_random_uuid(),
  estatua_id uuid references estatuas(id) on delete cascade,
  url text not null,
  titulo text,
  descripcion text,
  categoria text,
  orden int default 0
);

create table lugares (
  id uuid primary key default gen_random_uuid(),
  estatua_id uuid references estatuas(id) on delete cascade,
  nombre text not null,
  descripcion text,
  categoria text,
  orden int default 0
);

create table galeria (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  titulo text,
  descripcion text,
  categoria text,
  orden int default 0,
  created_at timestamptz default now()
);

create table lugares_pueblo (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  categoria text,
  imagen_url text,
  orden int default 0
);

alter table estatuas enable row level security;
alter table capitulos enable row level security;
alter table estatua_imagenes enable row level security;
alter table lugares enable row level security;
alter table galeria enable row level security;
alter table lugares_pueblo enable row level security;

create policy "Lectura publica" on estatuas for select using (activa = true);
create policy "Lectura publica" on capitulos for select using (true);
create policy "Lectura publica" on estatua_imagenes for select using (true);
create policy "Lectura publica" on lugares for select using (true);
create policy "Lectura publica" on galeria for select using (true);
create policy "Lectura publica" on lugares_pueblo for select using (true);

create index on capitulos(estatua_id, orden);
create index on estatua_imagenes(estatua_id, orden);
create index on lugares(estatua_id, orden);
create index on estatuas(activa, orden);
