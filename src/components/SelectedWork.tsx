'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';
import { SectionReveal } from './SectionReveal';
import { Arrow } from './icons/Arrow';

const ease = [0.6, 0.05, 0.05, 1] as const;

/**
 * Selected work — reimagined as a floating 3D card in perspective space.
 * - Card tilts under cursor via CSS 3D transforms
 * - Massive display type for the client name sits BEHIND the card (parallax)
 * - Arrow controls float on either side of the card
 * - Caption + tag crossfade cleanly between projects
 * - Scroll-triggered reveal on the whole composition
 */
export function SelectedWork() {
  const t = useTranslations('work');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const brand = BRANDS[index];
  const client = isAr ? brand.clientAr : brand.client;
  const tag = isAr ? brand.tagAr : brand.tagEn;

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + BRANDS.length) % BRANDS.length);
  };

  return (
    <section
      id="work"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Headline + counter */}
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10">
        <SectionReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-condensed font-black uppercase text-display-section">
              {t('headline')}
            </h2>
            <span className="mt-6 block font-medium text-xs tracking-widest text-bone/55 tabular-nums">
              {index + 1}
              {' / '}
              {BRANDS.length}
            </span>
          </div>
        </SectionReveal>

        {/* The composition: giant back-plate type + floating 3D card + arrows */}
        <div
          className="relative"
          style={{ perspective: '2000px', perspectiveOrigin: '50% 40%' }}
        >
          {/* Back-plate: massive client name behind the card, parallaxes on nav */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.span
                key={brand.slug + '-backplate'}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80 }}
                animate={{ opacity: 0.08, x: 0 }}
                exit={{ opacity: 0, x: direction * -80 }}
                transition={{ duration: 0.6, ease }}
                className="font-condensed font-black uppercase leading-none tracking-[-0.04em] whitespace-nowrap text-bone select-none"
                style={{ fontSize: 'clamp(6rem, 22vw, 22rem)' }}
              >
                {client}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Card + arrow controls */}
          <div className="relative flex items-center justify-center py-12 md:py-16">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="focus-ring absolute left-0 md:left-8 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-bone/8 backdrop-blur-md text-bone border border-bone/20 hover:bg-bone hover:text-ink hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="rotate-180 inline-block">
                <Arrow className="w-5 h-5 md:w-6 md:h-6" />
              </span>
            </button>

            <div
              ref={cardRef}
              className="relative w-full max-w-4xl"
              onMouseMove={(e) => {
                if (!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                cardRef.current.style.setProperty('--rx', `${-y * 8}deg`);
                cardRef.current.style.setProperty('--ry', `${x * 10}deg`);
              }}
              onMouseLeave={() => {
                if (!cardRef.current) return;
                cardRef.current.style.setProperty('--rx', '0deg');
                cardRef.current.style.setProperty('--ry', '0deg');
              }}
              style={{
                transform:
                  'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s cubic-bezier(0.2, 0.9, 0.2, 1)',
              }}
            >
              <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.div
                  key={brand.slug}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -60, scale: 0.96 }}
                  transition={{ duration: 0.65, ease }}
                >
                  <Link
                    href={`/work/${brand.slug}`}
                    className="group block focus-ring"
                    aria-label={`Open ${client} case study`}
                  >
                    <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-xl bg-white shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9),0_20px_40px_-20px_rgba(0,0,0,0.5)]">
                      <Image
                        src={brand.hero}
                        alt={client}
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority={index === 0}
                        className="object-contain p-8 md:p-16 transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.03]"
                      />
                      {/* Edge glare */}
                      <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/10 to-white/30 mix-blend-overlay"
                      />
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="focus-ring absolute right-0 md:right-8 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-bone/8 backdrop-blur-md text-bone border border-bone/20 hover:bg-bone hover:text-ink hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Arrow className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Foreground caption row */}
          <div className="relative z-10 mt-8 md:mt-12 min-h-[140px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={brand.slug + '-caption'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col items-center gap-5 text-center"
              >
                <div>
                  <p className="font-medium text-xs uppercase tracking-widest text-bone/55 mb-2">
                    {tag}
                  </p>
                  <p className="font-condensed font-black uppercase text-2xl md:text-4xl leading-none">
                    {client}
                  </p>
                </div>
                <Link
                  href={`/work/${brand.slug}`}
                  className="focus-ring font-medium text-xs md:text-sm uppercase tracking-widest text-bone hover:opacity-70 inline-flex items-center gap-2 transition-opacity"
                >
                  {t('caseStudy')}
                  <span className="inline-block">
                    <Arrow className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination + all-work link */}
        <SectionReveal delay={0.2}>
          <div className="mt-16 md:mt-24 flex flex-col items-center gap-8">
            <div className="flex items-center gap-2">
              {BRANDS.map((b, i) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to ${isAr ? b.clientAr : b.client}`}
                  aria-current={i === index}
                  className={`focus-ring h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-12 bg-bone' : 'w-1.5 bg-bone/30 hover:bg-bone/60'
                  }`}
                />
              ))}
            </div>
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-3 text-sm border-b border-bone/40 pb-1 hover:border-bone hover:gap-5 transition-all duration-300"
            >
              {t('viewAll')}
              <span className="inline-block">
                <Arrow className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
