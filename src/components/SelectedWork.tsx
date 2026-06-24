'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';
import { SectionReveal } from './SectionReveal';
import { Arrow } from './icons/Arrow';

const ease = [0.6, 0.05, 0.05, 1] as const;

export function SelectedWork() {
  const t = useTranslations('work');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const brand = BRANDS[index];
  const client = isAr ? brand.clientAr : brand.client;
  const tag = isAr ? brand.tagAr : brand.tagEn;

  const go = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + BRANDS.length) % BRANDS.length);
  };

  return (
    <section id="work" className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-16 md:py-24">
        <SectionReveal>
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <h2 className="font-medium text-display-lg max-w-2xl rtl:leading-[1.15]">
              {t('headline')}
            </h2>
            <span className="hidden md:block font-medium text-xs tracking-widest rtl:tracking-normal text-bone/55 tabular-nums">
              {String(index + 1).padStart(2, '0')}{' / '}{String(BRANDS.length).padStart(2, '0')}
            </span>
          </div>
        </SectionReveal>

        {/* Single tile with crossfade transition between brands */}
        <SectionReveal>
          <div className="relative">
            <Link
              href={`/work/${brand.slug}`}
              className="group block focus-ring"
              aria-label={`Open ${client} case study`}
            >
              <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-card bg-surface">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={brand.slug}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -40 }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={brand.hero}
                      alt={client}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      priority={index === 0}
                      className="object-contain p-6 md:p-10 transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.02]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>

            {/* L/R arrow controls, edge-pinned and slightly inset */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous project"
              className="focus-ring absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink/80 backdrop-blur-sm text-bone border hairline hover:bg-ink hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="rotate-180 inline-block">
                <Arrow className="w-5 h-5" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next project"
              className="focus-ring absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-ink/80 backdrop-blur-sm text-bone border hairline hover:bg-ink hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Arrow className="w-5 h-5" />
            </button>
          </div>

          {/* Caption row: client name + tag + case study link. Crossfades with image. */}
          <div className="mt-6 md:mt-8 grid grid-cols-12 gap-4 items-baseline min-h-[80px] md:min-h-[120px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={brand.slug + '-caption'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease }}
                className="col-span-12 grid grid-cols-12 gap-4 items-baseline"
              >
                <p className="col-span-8 font-condensed font-black uppercase leading-[0.95] tracking-[-0.02em] rtl:leading-[1.15] rtl:tracking-normal text-3xl md:text-6xl">
                  {client}
                </p>
                <Link
                  href={`/work/${brand.slug}`}
                  className="col-span-4 justify-self-end focus-ring font-medium text-xs uppercase tracking-widest rtl:tracking-normal text-bone/55 hover:text-bone inline-flex items-center gap-2 shrink-0 transition-colors"
                >
                  {t('caseStudy')}
                  <span className="inline-block rtl:rotate-180">
                    <Arrow className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <p className="col-span-12 mt-1 text-sm md:text-base text-bone/85">{tag}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
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
                  i === index ? 'w-10 bg-bone' : 'w-1.5 bg-bone/30 hover:bg-bone/60'
                }`}
              />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-16 md:mt-20 flex justify-center">
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-3 text-sm border-b border-bone/40 pb-1 hover:border-bone hover:gap-5 transition-all duration-300"
            >
              {t('viewAll')}
              <span className="inline-block rtl:rotate-180">
                <Arrow className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
