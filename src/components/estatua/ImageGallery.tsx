'use client'

import { useState } from 'react'
import { EstatuaImagen } from '@/types'
import EditorialNum from './EditorialNum'
import FramedPainting from './FramedPainting'

interface ImageGalleryProps {
  imagenes: EstatuaImagen[]
  nombreEstatua: string
}

export default function ImageGallery({ imagenes, nombreEstatua }: ImageGalleryProps) {
  const [imagenAmpliada, setImagenAmpliada] = useState<EstatuaImagen | null>(null)

  if (!imagenes.length) {
    return (
      <section className="paper-bg" style={{ background: 'var(--bg)', padding: '56px 26px 48px' }}>
        <EditorialNum num="03" label="Vida en Archivos" />
        <div className="hr-brown" style={{ margin: '12px 0 22px' }} />
        <p style={{ color: 'var(--ink-4)', fontFamily: 'var(--font-display)', fontSize: '20px', fontStyle: 'italic' }}>
          Aún no tenemos imágenes para esta estatua.
        </p>
      </section>
    )
  }

  return (
    <>
      <section className="paper-bg" style={{ background: 'var(--bg)', padding: '56px 0 48px' }}>
        <div style={{ padding: '0 26px' }}>
          <EditorialNum num="03" label="Vida en Archivos" />
          <div className="hr-brown" style={{ margin: '12px 0 22px' }} />
          <h2 style={{ fontSize: '28px' }}>Vida en Archivos.</h2>
        </div>
        <div className="scroll-x" style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '28px 26px 0' }}>
          {imagenes.map((img, index) => (
            <button
              key={`${img.url}-${index}`}
              onClick={() => setImagenAmpliada(img)}
              style={{
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                flexShrink: 0,
                maxWidth: '220px',
                padding: 0,
                textAlign: 'left',
                width: '220px',
              }}
            >
              <FramedPainting src={img.url} alt={img.titulo || nombreEstatua} height={270} tone={index % 2 === 0 ? 'sepia' : 'sky'} />
              <div style={{ paddingTop: '12px' }}>
                <p className="editorial-lbl" style={{ fontSize: '7px', marginBottom: '6px' }}>
                  {img.categoria}
                </p>
                <h3 style={{ fontSize: '14px', lineHeight: 1.15, marginBottom: '4px' }}>{img.titulo}</h3>
                <p style={{ color: 'var(--ink-3)', fontSize: '10px', lineHeight: 1.55 }}>{img.descripcion}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {imagenAmpliada && (
        <div
          aria-modal="true"
          onClick={() => setImagenAmpliada(null)}
          role="dialog"
          style={{
            alignItems: 'center',
            background: 'rgba(28,16,8,0.86)',
            display: 'flex',
            inset: 0,
            justifyContent: 'center',
            padding: '26px',
            position: 'fixed',
            zIndex: 80,
          }}
        >
          <button
            aria-label="Cerrar imagen"
            onClick={() => setImagenAmpliada(null)}
            style={{
              background: 'var(--bg)',
              border: '0.5px solid var(--border)',
              color: 'var(--red)',
              height: '36px',
              position: 'absolute',
              right: '24px',
              top: '24px',
              width: '36px',
            }}
          >
            ×
          </button>
          <div onClick={(event) => event.stopPropagation()} style={{ width: 'min(100%, 420px)' }}>
            <FramedPainting src={imagenAmpliada.url} alt={imagenAmpliada.titulo} height={420} tone="portrait" />
          </div>
        </div>
      )}
    </>
  )
}
