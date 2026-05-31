import Link from 'next/link';
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
export default async function HomePage() {
    const [estatuas, imagenesGaleria, lugaresPueblo] = await Promise.all([
        getTodasEstatuas(),
        getGaleriaPublica(),
        getLugaresPueblo(),
    ]);
    return (<main style={{
            backgroundImage: "url('/assets/fondo-vertical-.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '512px 512px',
            minHeight: '100vh',
        }}>
      <div>
        <header aria-label="Navegacion principal">
          <Link href="/">
            <span>SL</span>
            <span>
              <span>San Lorenzo</span>
              <span>Estatuas Vivas</span>
            </span>
          </Link>
          <nav>
            {navItems.map(([label, href], index) => (<Link key={label} href={href}>
                {label}
              </Link>))}
          </nav>
          <span>ES</span>
        </header>

        <section>
          <div />
          <div>
            <h1>
              Las
              <br />
              Estatuas
              <br />
              Cobran Vida.
            </h1>
            <span />
            <p>Acercate a una estatua del pueblo, escanea su QR, y dejala que te cuente.</p>
          </div>
        </section>

        <section id="estatuas">
          <div>
            <p>01 - Estatuas</p>
            <h2>Historias que esperan ser escuchadas.</h2>
          </div>
          <div>
            {estatuas.map((estatua) => (<Link href={`/estatuas/${estatua.slug}`} key={estatua.id}>
                <OrnamentalFrame alt={estatua.nombre} aspectRatio="16 / 10.4" src={estatua.imagenes[0]?.url} variant="sides"/>
                <p>{estatua.subtitulo}</p>
                <h3>{estatua.nombre}</h3>
                <span>{estatua.frase}</span>
              </Link>))}
          </div>
        </section>

        <section>
          <div>
            <p>02 - Galeria Historica</p>
            <h2>Archivo visual del pueblo.</h2>
          </div>
          <div>
            {imagenesGaleria[0] && (<MuseumFeatureCard actionHref="/galeria" actionLabel="Ver galeria" categoria={imagenesGaleria[0].categoria} descripcion={imagenesGaleria[0].descripcion} imageUrl={imagenesGaleria[0].url} titulo={imagenesGaleria[0].titulo}/>)}
            <ArchiveGrid items={imagenesGaleria.slice(1, 5)}/>
            <Link href="/galeria">
              Ver galeria completa <span>-&gt;</span>
            </Link>
          </div>
        </section>

        <section id="contacto">
          <div>
            <p>03 - Lugares</p>
            <h2>El pueblo recomienda.</h2>
          </div>
          <div>
            {lugaresPueblo.slice(0, 4).map((lugar, index) => (<PlaceEditorialCard categoria={lugar.categoria} descripcion={lugar.descripcion} imageUrl={lugar.imagen_url} index={index} key={lugar.id} nombre={lugar.nombre}/>))}
          </div>
          <Link href="/lugares">
            Ver todos los lugares <span>-&gt;</span>
          </Link>
        </section>
      </div>
    </main>);
}
