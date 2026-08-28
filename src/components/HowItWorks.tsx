'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { SectionReveal } from './SectionReveal';
import { Arrow } from './icons/Arrow';

const STEPS = [
  'discovery',
  'scoping',
  'proposal',
  'design',
  'production',
  'launch',
] as const;

/**
 * "How it works" — the agency process as a drag carousel of glass cards.
 *
 * Interaction: framer drag with elastic edges, horizontal wheel/trackpad
 * pan support, and a progress line driven by the drag position. Cards get
 * a lift + glass brighten on hover. Matches the glass grammar used across
 * the redesign (connect form, studio office cards, scope chips).
 */
export function HowItWorks() {
  const t = useTranslations('process');
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, -Math.max(1, maxDrag)], [0, 1]);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      setMaxDrag(
        Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth),
      );
    };
    measure();
    window.addEventListener('resize', measure);
    // Fonts/images settling can change the track width
    const late = setTimeout(measure, 500);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(late);
    };
  }, []);

  // Horizontal wheel / trackpad pan. Vertical wheel is left to the page.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const next = Math.max(-maxDrag, Math.min(0, x.get() - e.deltaX));
      x.set(next);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [maxDrag, x]);

  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10">
        <SectionReveal>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-condensed font-black uppercase text-display-section">
              {t('headline')}
            </h2>
            <p className="mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-bone/75 leading-relaxed">
              {t('lede')}
            </p>
            <p className="mt-4 hidden md:inline-flex items-center gap-2 font-medium text-[11px] uppercase tracking-widest text-bone/45">
              {t('hint')}
              <Arrow className="w-3.5 h-3.5" />
            </p>
          </div>
        </SectionReveal>
      </div>

      {/* Carousel — full-bleed viewport, cards aligned to the content column */}
      <SectionReveal delay={0.1}>
        <div ref={viewportRef} className="relative z-10 overflow-hidden -my-6">
          {/* py-6 gives the hover lift + shadow headroom inside the
              overflow-hidden viewport; -my-6 on the viewport cancels the
              extra vertical footprint. */}
          <motion.div
            ref={trackRef}
            drag="x"
            style={{ x }}
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.07}
            className="flex gap-4 md:gap-6 w-max py-6 cursor-grab active:cursor-grabbing ps-6 md:ps-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))] pe-6 md:pe-10"
          >
            {STEPS.map((key, i) => (
              <div
                key={key}
                className="group relative shrink-0 w-[280px] md:w-[360px] min-h-[340px] md:min-h-[400px] rounded-xl bg-bone/5 border border-bone/10 backdrop-blur-md p-7 md:p-9 flex flex-col select-none transition-all duration-500 ease-smooth hover:bg-bone/[0.08] hover:border-bone/25 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
              >
                <span className="font-condensed font-black leading-none text-[84px] md:text-[110px] text-bone/10 group-hover:text-bone/20 transition-colors duration-500">
                  {i + 1}
                </span>

                <div className="mt-auto">
                  <h3 className="font-condensed font-black uppercase text-2xl md:text-3xl leading-tight">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-bone/70 leading-relaxed">
                    {t(`steps.${key}.body`)}
                  </p>
                </div>

                {/* Flow arrow — hints the sequence, hidden on the last card */}
                {i < STEPS.length - 1 && (
                  <span className="absolute top-7 right-7 md:top-9 md:right-9 text-bone/25 group-hover:text-bone/60 transition-colors duration-500">
                    <Arrow className="w-5 h-5" />
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      {/* Progress line driven by drag position */}
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 mt-10 md:mt-14">
        <div className="h-px bg-bone/15 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-bone origin-left"
            style={{ scaleX: progress }}
          />
        </div>
      </div>
    </section>
  );
}
