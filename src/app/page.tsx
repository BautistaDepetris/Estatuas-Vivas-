import Link from 'next/link';
import type { CSSProperties } from 'react';
import ArchiveGrid from '@/components/editorial/ArchiveGrid';
import MuseumFeatureCard from '@/components/editorial/MuseumFeatureCard';
import OrnamentalFrame from '@/components/editorial/OrnamentalFrame';
import PlaceEditorialCard from '@/components/editorial/PlaceEditorialCard';
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
    backgroundImage: "url('/assets/casi final.png')",
    backgroundRepeat: 'repeat',
    backgroundSize: '512px 512px',
    minHeight: '100vh',
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

const cardTitleStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontDisplay,
    fontSize: 'clamp(24px, 5vw, 34px)',
    fontStyle: 'italic',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: 1,
};

const bodyTextStyle: CSSProperties = {
    color: '#3A0F0E',
    fontFamily: fontBody,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.7,
};

const cardCtaStyle: CSSProperties = {
    color: '#3A0F0E',
    display: 'inline-flex',
    fontFamily: fontBody,
    fontSize: '10px',
    fontWeight: 500,
    gap: '10px',
    letterSpacing: '0.22em',
    marginTop: '14px',
    textTransform: 'uppercase',
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
    return (<main style={pageStyle}>
      <div>
        <header aria-label="Navegacion principal">
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

        <section>
          <div />
          <div>
            <h1 style={heroTitleStyle}>
              Las
              <br />
              Estatuas
              <br />
              Cobran Vida.
            </h1>
            <span style={accentMarkStyle} />
            <p style={quoteTextStyle}>Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.</p>
          </div>
        </section>

        <section id="estatuas">
          <div>
            <p style={labelStyle}>01 - Estatuas</p>
            <h2 style={sectionTitleStyle}>Historias que esperan ser escuchadas.</h2>
          </div>
          <div>
            {estatuas.map((estatua) => (<Link href={`/estatuas/${estatua.slug}`} key={estatua.id}>
                <OrnamentalFrame alt={estatua.nombre} aspectRatio="16 / 10.4" src={estatua.imagenes[0]?.url} variant="sides"/>
                <p style={labelStyle}>{estatua.subtitulo}</p>
                <h3 style={cardTitleStyle}>{estatua.nombre}</h3>
                <span style={bodyTextStyle}>{estatua.frase}</span>
                <span style={cardCtaStyle}>
                  Ver mas <span aria-hidden="true">-&gt;</span>
                </span>
              </Link>))}
          </div>
        </section>

        <section>
          <div>
            <p style={labelStyle}>02 - Galeria Historica</p>
            <h2 style={sectionTitleStyle}>Archivo visual del pueblo.</h2>
          </div>
          <div>
            {imagenesGaleria[0] && (<MuseumFeatureCard actionHref="/galeria" actionLabel="Ver galeria" categoria={imagenesGaleria[0].categoria} descripcion={imagenesGaleria[0].descripcion} imageUrl={imagenesGaleria[0].url} titulo={imagenesGaleria[0].titulo}/>)}
            <ArchiveGrid items={imagenesGaleria.slice(1, 5)}/>
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
            {lugaresPueblo.slice(0, 4).map((lugar, index) => (<PlaceEditorialCard categoria={lugar.categoria} descripcion={lugar.descripcion} imageUrl={lugar.imagen_url} index={index} key={lugar.id} nombre={lugar.nombre}/>))}
          </div>
          <Link href="/lugares" style={navTextStyle}>
            Ver todos los lugares <span>-&gt;</span>
          </Link>
        </section>
      </div>
    </main>);
}
