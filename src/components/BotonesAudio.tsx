'use client';

import React, { useEffect, useRef, useState } from 'react';
import './BotonesAudio.css';

/**
 * BotonesAudio — Reproductores de audio del sistema "San Lorenzo".
 * 3 componentes fieles al diseño: AudioHero, AudioTracks, AudioPills.
 *
 * Estados: idle / playing (glyph play↔pausa, ecualizador, barra de progreso).
 *
 * ⚠️ La reproducción es DEMO (timers que simulan el progreso), igual que el
 * mockup. En producción reemplazá los timers por un <audio> real y actualizá
 * el progreso con (audio.currentTime / audio.duration). Pasá las URLs reales
 * vía props (no se hardcodean datos acá).
 */

/* Glyph play (triángulo) / pausa (dos barras) — CSS puro, color = currentColor */
function Glyph({ playing }: { playing: boolean }) {
  return playing ? (
    <span className="pause">
      <i />
      <i />
    </span>
  ) : (
    <span className="tri" />
  );
}

/* ---- 01 · Play principal (hero) ---- */
export interface AudioHeroProps {
  /** Eyebrow superior. Default "Relato principal". */
  kicker?: string;
  /** Título del relato (Playfair italic). */
  titulo: string;
  /** Texto de duración / tipo, ej: "02:14 · narración". */
  duracion: string;
  /** Click de play/pausa (enganchá tu <audio> real acá). */
  onToggle?: (playing: boolean) => void;
}
export function AudioHero({ kicker = 'Relato principal', titulo, duracion, onToggle }: AudioHeroProps) {
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    setPlaying((p) => {
      const next = !p;
      onToggle?.(next);
      return next;
    });
  };
  return (
    <div className="hero">
      <button
        className={`big${playing ? ' playing' : ''}`}
        aria-label={playing ? 'Pausar relato principal' : 'Reproducir relato principal'}
        onClick={toggle}
      >
        <span className="ico glyph">
          <Glyph playing={playing} />
        </span>
      </button>
      <div className="meta">
        <div className="k">{kicker}</div>
        <div className="ti">{titulo}</div>
        <div className="du">{duracion}</div>
      </div>
    </div>
  );
}

/* ---- 02 · Lista de pistas (una a la vez + progreso) ---- */
export interface AudioTrack {
  titulo: string;
  sub: string;
  duracion: string;
}
export interface AudioTracksProps {
  tracks: AudioTrack[];
}
export function AudioTracks({ tracks }: AudioTracksProps) {
  const [active, setActive] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active === null) {
      setProgress(0);
      return;
    }
    setProgress(0);
    timer.current = setInterval(() => {
      // DEMO: loop de progreso. Reemplazar por audio.currentTime/duration.
      setProgress((p) => (p >= 100 ? 0 : p + 0.7));
    }, 200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active]);

  const toggle = (i: number) => setActive((cur) => (cur === i ? null : i));

  return (
    <div className="tracks">
      {tracks.map((t, i) => {
        const isActive = active === i;
        return (
          <div
            key={i}
            className={`track${isActive ? ' active' : ''}`}
            onClick={() => toggle(i)}
            role="button"
            tabIndex={0}
          >
            <div className="btn">
              <span className="glyph">
                <Glyph playing={isActive} />
              </span>
            </div>
            <div className="info">
              <div className="ti">{t.titulo}</div>
              <div className="sub">{t.sub}</div>
              <div className="eq">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="dur">{t.duracion}</div>
            <span className="prog" style={{ width: isActive ? `${progress}%` : 0 }} />
          </div>
        );
      })}
    </div>
  );
}

/* ---- 03 · Píldoras compactas (cada una toggle independiente) ---- */
function Pill({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <button className="pill" onClick={() => setOn((o) => !o)}>
      <span className="dot">
        <Glyph playing={on} />
      </span>
      {label}
    </button>
  );
}
export interface AudioPillsProps {
  pills: string[];
}
export function AudioPills({ pills }: AudioPillsProps) {
  return (
    <div className="pills">
      {pills.map((label, i) => (
        <Pill key={i} label={label} />
      ))}
    </div>
  );
}
