import Link from 'next/link';
import type { CSSProperties } from 'react';
import EstatuaHomeCard from '@/components/EstatuaHomeCard';
import { getGaleriaPublica, getLugaresPueblo, getTodasEstatuas } from '@/lib/supabase/queries';
export const dynamic = 'force-dynamic';
const navItems = [
    ['Inicio', '/'],
    ['El Pueblo', '/lugares'],
    ['Estatuas', '#estatuas'],
    ['Archivo Historico', '/galeria'],
    ['Galeria', '/galeria'],
    ['Visitas', '/lugares'],
    ['Contacto', '#contacto'],
] as const;

const fontDisplay = "'Playfair Display', Georgia, serif";
const fontBody = "'Inter', system-ui, -apple-system, sans-serif";

const pageStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontBody,
};

const brandNameStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontDisplay,
    fontSize: '28px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 1,
};

const brandMetaStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontBody,
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.28em',
    lineHeight: 1.2,
    textTransform: 'uppercase',
};

const navTextStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontBody,
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
};

const labelStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontBody,
    fontSize: '9px',
    fontWeight: 500,
    letterSpacing: '0.28em',
    lineHeight: 1.4,
    textTransform: 'uppercase',
};

const heroTitleStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontDisplay,
    fontSize: 'clamp(54px, 12vw, 96px)',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: 0.92,
};

const sectionTitleStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontDisplay,
    fontSize: 'clamp(34px, 7vw, 56px)',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: 0.95,
};

const quoteTextStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontDisplay,
    fontSize: '20px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 1.35,
};

const accentMarkStyle: CSSProperties = {
    background: '#3A0F0E',
};

export default async function HomePage() {
    const [estatuas, imagenesGaleria, lugaresPueblo] = await Promise.all([
        getTodasEstatuas(),
        getGaleriaPublica(),
        getLugaresPueblo(),
    ]);
    return (<main className="landing-background" style={pageStyle}>
      <div>
        <header aria-label="Navegacion principal" className="home-header">
          <Link href="/" style={navTextStyle}>
            <span style={{ color: '#3A0F0E' }}>SL</span>
            <span>
              <span style={brandNameStyle}>San Lorenzo</span>
              <span style={brandMetaStyle}>Estatuas Vivas</span>
            </span>
          </Link>
          <nav>
            {navItems.map(([label, href]) => (<Link key={label} href={href} style={navTextStyle}>
                {label}
              </Link>))}
          </nav>
          <span style={navTextStyle}>ES</span>
        </header>

        <section className="home-hero">
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <div className="home-hero__place">
                <span>San Lorenzo</span>
                <span>Cordoba · Argentina</span>
              </div>
              <h1 style={heroTitleStyle} className="home-hero__title">
                Las
                <br />
                Estatuas
                <br />
                Cobran Vida.
              </h1>
              <p className="home-hero__meta">Patrimonio Cultural · Cordoba, Argentina</p>
              <p style={quoteTextStyle} className="home-hero__lead">Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.</p>
            </div>
            <div className="home-hero__figure" aria-hidden="true">
              <img src="/assets/estatuas sin fondo.png" alt="" />
            </div>
          </div>
        </section>

        <section id="estatuas">
          <div>
            <p style={labelStyle}>01 - Estatuas</p>
            <h2 style={sectionTitleStyle}>Historias que esperan ser escuchadas.</h2>
          </div>
          <div>
            {estatuas.map((estatua) => (<EstatuaHomeCard
                slug={estatua.slug}
                nombre={estatua.nombre}
                subtitulo={estatua.subtitulo}
                descripcion={estatua.capitulos?.[0]?.texto?.slice(0, 120) || estatua.frase || ''}
                imagenUrl={estatua.imagenes?.[0]?.url}
                imagenAlt={estatua.nombre}
                ctaLabel="Descubrir"
                href={`/estatuas/${estatua.slug}`}
                key={estatua.id}
              />))}
          </div>
        </section>

        <section>
          <div>
            <p style={labelStyle}>02 - Galeria Historica</p>
            <h2 style={sectionTitleStyle}>Archivo visual del pueblo.</h2>
          </div>
          <div>
            {imagenesGaleria.slice(0, 5).map((imagen) => (<EstatuaHomeCard
                slug={imagen.id}
                nombre={imagen.titulo}
                subtitulo={imagen.categoria}
                descripcion={imagen.descripcion}
                imagenUrl={imagen.url}
                imagenAlt={imagen.titulo}
                ctaLabel="Ver galeria"
                href="/galeria"
                key={imagen.id}
              />))}
            <Link href="/galeria" style={navTextStyle}>
              Ver galeria completa <span>-&gt;</span>
            </Link>
          </div>
        </section>

        <section id="contacto">
          <div>
            <p style={labelStyle}>03 - Lugares</p>
            <h2 style={sectionTitleStyle}>El pueblo recomienda.</h2>
          </div>
          <div>
            {lugaresPueblo.slice(0, 4).map((lugar) => (<EstatuaHomeCard
                slug={lugar.id}
                nombre={lugar.nombre}
                subtitulo={lugar.categoria}
                descripcion={lugar.descripcion}
                imagenUrl={lugar.imagen_url ?? undefined}
                imagenAlt={lugar.nombre}
                ctaLabel="Ver todos los lugares"
                href="/lugares"
                key={lugar.id}
              />))}
          </div>
          <Link href="/lugares" style={navTextStyle}>
            Ver todos los lugares <span>-&gt;</span>
          </Link>
        </section>
      </div>
    </main>);
}
