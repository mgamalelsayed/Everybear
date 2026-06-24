'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { CLIENTS } from '@/lib/clients';
import { SectionReveal } from './SectionReveal';

/**
 * Self-built infinite carousel:
 *   - Single JS rAF loop drives a translate-X offset on the track
 *   - Offset wraps modulo half the track width (list is duplicated), so the
 *     loop is truly infinite with no empty space at any point
 *   - Mouse wheel inside the strip adds to the offset (deltaY = horizontal
 *     nudge); page does not scroll while pointer is over the carousel
 *   - Hovering a tile pauses the auto-drift
 */
export function Clients() {
  const t = useTranslations('clients');
  const items = [...CLIENTS, ...CLIENTS];

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  // Drive the carousel manually with rAF so wheel and auto-scroll can share
  // the same offset state and wrap cleanly.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current) {
        // 60 px / second leftward — slow ambient drift, matches the old 70s loop
        offsetRef.current -= 60 * dt;
      }

      // Wrap so the offset stays in (-halfWidth, 0]. The list is duplicated,
      // so a wrap by half-width is visually identical.
      const half = halfWidthRef.current;
      if (half > 0) {
        while (offsetRef.current <= -half) offsetRef.current += half;
        while (offsetRef.current > 0) offsetRef.current -= half;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Wheel → horizontal nudge. Bound to the strip container so vertical wheel
  // outside the strip still scrolls the page normally.
  useEffect(() => {
    const strip = trackRef.current?.parentElement;
    if (!strip) return;

    const onWheel = (e: WheelEvent) => {
      // Use whichever delta is larger so trackpad horizontal swipes work too.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      offsetRef.current -= delta;
    };

    strip.addEventListener('wheel', onWheel, { passive: false });
    return () => strip.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      id="studio"
      className="clients-section relative overflow-hidden border-b hairline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        pausedRef.current = false;
      }}
    >
      {/* Backdrop EVERYBEAR wordmark. Fades in only when a tile is hovered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center select-none"
      >
        <span
          className="clients-backdrop font-condensed font-black uppercase leading-none tracking-[-0.04em] text-bone opacity-0 transition-opacity duration-700 ease-smooth whitespace-nowrap"
          style={{ fontSize: 'clamp(3rem, 16vw, 22rem)' }}
        >
          Everybear
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 pt-16 md:pt-24 pb-10 md:pb-14">
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
            <h2 className="md:col-span-7 font-medium text-display-lg">
              {t('headline')}
            </h2>
            <p className="md:col-span-4 md:col-start-9 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85]">
              {t('lede')}
            </p>
          </div>
        </SectionReveal>
        {hovered && (
          <p className="absolute right-6 md:right-10 top-24 md:top-40 font-medium text-[11px] rtl:text-sm uppercase tracking-widest text-bone/55 pointer-events-none">
            Scroll to browse
          </p>
        )}
      </div>

      {/* Carousel strip — overflow-hidden container, track translates inside */}
      <div className="relative z-10 pb-16 md:pb-24 overflow-hidden">
        <div ref={trackRef} className="flex gap-3 md:gap-5 w-max will-change-transform">
          {items.map((c, i) => (
            <div
              key={`${c.slug}-${i}`}
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
              className="client-tile group/tile relative w-40 h-24 md:w-56 md:h-32 shrink-0 bg-white rounded-md overflow-hidden transition-transform duration-500 ease-smooth hover:scale-[1.05] hover:z-10 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
            >
              <Image
                src={`/clients/${c.slug}.${c.ext ?? 'png'}`}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 160px, 224px"
                className="object-contain p-3 md:p-4 transition-transform duration-500 ease-smooth group-hover/tile:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
