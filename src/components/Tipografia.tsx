import React from 'react';
import './typography.css';

/**
 * Tipografía — sistema tipográfico "San Lorenzo".
 *
 * El entregable REAL son las clases CSS de `typography.css` (.display, .title,
 * .subtitle, .label, .body, .small + helpers de color .c-cream / .c-brown /
 * .c-brown-soft / .c-red). Aplicalas en cualquier parte de la app.
 *
 * Familias:
 *   - Títulos:  Playfair Display · Italic (.display / .title / .subtitle)
 *   - Cuerpo/etiquetas: Inter (.label / .body / .small)
 *   - Specs/numeración: JetBrains Mono
 *
 * Este componente es el SPECIMEN (guía de estilo viva), fiel al mockup.
 * Para uso normal NO necesitás este componente, solo el CSS.
 */
export default function Tipografia() {
  return (
    <main className="ty-specimen">
      <header className="doc-head">
        <div className="eyebrow">Sistema · Tipografía</div>
        <h1>Voz tipográfica</h1>
        <p>Playfair Display para títulos, Inter para etiquetas y cuerpo. Cada estilo vive en crema sobre negro o en marrón antiguo sobre papel.</p>
      </header>

      {/* 01 · Títulos */}
      <section className="group">
        <div className="group__label"><span className="n">01</span><span className="t">Títulos</span><span className="spec">Playfair Display · Italic</span></div>
        <div className="variant">
          <div className="variant__tag"><span className="dot cream" />Crema #F5EDD8 · sobre negro</div>
          <div className="panel"><div className="display c-cream">Sierras al Atardecer</div></div>
        </div>
        <div className="variant">
          <div className="variant__tag"><span className="dot brownd" />Marrón antiguo #1C1008 · sobre papel</div>
          <div className="panel paper"><div className="display c-brown">Sierras al Atardecer</div></div>
        </div>
      </section>

      {/* 02 · Subtítulos */}
      <section className="group">
        <div className="group__label"><span className="n">02</span><span className="t">Subtítulos</span><span className="spec">Playfair · 27 / 19px</span></div>
        <div className="variant">
          <div className="variant__tag"><span className="dot cream" />Crema · sobre negro</div>
          <div className="panel">
            <div className="title c-cream">Historia de San Lorenzo</div>
            <div className="subtitle c-cream mt-10 op-85">Fe que nos une, generación tras generación</div>
          </div>
        </div>
        <div className="variant">
          <div className="variant__tag"><span className="dot brownd" />Marrón antiguo · sobre papel</div>
          <div className="panel paper">
            <div className="title c-brown">Historia de San Lorenzo</div>
            <div className="subtitle c-brown-soft mt-10">Fe que nos une, generación tras generación</div>
          </div>
        </div>
      </section>

      {/* 03 · Etiquetas */}
      <section className="group">
        <div className="group__label"><span className="n">03</span><span className="t">Etiquetas</span><span className="spec">Inter · 11px · 0.15em · UPPER</span></div>
        <div className="variant">
          <div className="variant__tag"><span className="dot brownd" />Acento bordó · crema · marrón</div>
          <div className="panel">
            <div className="stack-14">
              <span className="label c-red">Patrimonio Cultural</span>
              <span className="label c-cream">Galería · Visitas · Contacto</span>
            </div>
          </div>
        </div>
        <div className="variant">
          <div className="panel paper">
            <div className="stack-14">
              <span className="label c-red">Devoción</span>
              <span className="label c-brown">Archivo Histórico</span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 · Cuerpo */}
      <section className="group">
        <div className="group__label"><span className="n">04</span><span className="t">Cuerpo</span><span className="spec">Inter Regular · 14 / 12px</span></div>
        <div className="variant">
          <div className="variant__tag"><span className="dot cream" />Crema #F5EDD8 · sobre negro</div>
          <div className="panel">
            <p className="body c-cream">Acercate a una estatua del pueblo, escaneá su QR y dejá que te cuente. Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.</p>
            <p className="small c-cream op-60 mt-10">Texto secundario · pies de foto y notas al pie.</p>
          </div>
        </div>
        <div className="variant">
          <div className="variant__tag"><span className="dot brownd" />Marrón antiguo #3D2B1F · sobre papel</div>
          <div className="panel paper">
            <p className="body c-brown-soft">Acercate a una estatua del pueblo, escaneá su QR y dejá que te cuente. Las sierras cordobesas que Brochero recorrió a lomo de mula durante décadas.</p>
            <p className="small c-brown-soft op-70 mt-10">Texto secundario · pies de foto y notas al pie.</p>
          </div>
        </div>
      </section>

      {/* 05 · Color de letra */}
      <section className="group">
        <div className="group__label"><span className="n">05</span><span className="t">Color de letra</span><span className="spec">tokens</span></div>
      </section>
      <div className="tokens">
        <div className="token"><div className="chip" style={{ background: '#F5EDD8' }} /><div className="meta"><div className="name">Crema</div><div className="hex">#F5EDD8</div></div></div>
        <div className="token"><div className="chip" style={{ background: '#1C1008' }} /><div className="meta"><div className="name">Marrón antiguo</div><div className="hex">#1C1008</div></div></div>
        <div className="token"><div className="chip" style={{ background: '#3D2B1F' }} /><div className="meta"><div className="name">Marrón suave</div><div className="hex">#3D2B1F</div></div></div>
        <div className="token"><div className="chip" style={{ background: '#4E1419' }} /><div className="meta"><div className="name">Bordó</div><div className="hex">#4E1419</div></div></div>
      </div>
    </main>
  );
}
