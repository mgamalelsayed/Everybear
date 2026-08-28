'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';
import { SectionReveal } from './SectionReveal';
import { CtaButton } from './CtaButton';
import { Arrow } from './icons/Arrow';

const ease = [0.6, 0.05, 0.05, 1] as const;

/**
 * Work index — editorial hover list.
 *
 * Desktop: left column is a sticky viewport panel where the hovered project's
 * hero image floats in a card, crossfading as the cursor moves down the list.
 * Right column is the list itself: giant condensed names that dim when idle
 * and light up under the cursor.
 *
 * Mobile: the sticky panel disappears; each row carries its own image card.
 */
export function WorkIndex() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [active, setActive] = useState(0);

  const brand = BRANDS[active];

  return (
    <>
      {/* Header */}
      <section className="pt-40 md:pt-52 pb-10 md:pb-14">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <SectionReveal>
            <h1 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-xl">
              {isAr ? 'الغرف التي تركنا فيها صدى.' : 'Rooms we made noise in.'}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-bone/75 leading-relaxed">
              {isAr
                ? 'مجموعة مختارة من المشاريع التي تعكس كيف نُطلق العلامات ونُجدّدها ونُنقذها. لكل مشروع قصته الخاصّة، ولكنّها جميعًا تشترك في الحِرفة.'
                : 'A curated set of projects across packaging, branding, signage, and events. Every project is its own story, all of them share one thing: craft.'}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Split: sticky image + list */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-wide px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sticky image panel — desktop only */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-32 aspect-[4/3]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={brand.slug}
                  initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full bg-white/90 rounded-xl overflow-hidden shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)]">
                    <Image
                      src={brand.hero}
                      alt={isAr ? brand.clientAr : brand.client}
                      fill
                      sizes="40vw"
                      className="object-contain p-8"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Project list */}
          <ul className="lg:col-span-7 lg:col-start-7">
            {BRANDS.map((b, i) => {
              const client = isAr ? b.clientAr : b.client;
              const tag = isAr ? b.tagAr : b.tagEn;
              const isActive = i === active;
              return (
                <SectionReveal key={b.slug} delay={i * 0.05}>
                  <li
                    onMouseEnter={() => setActive(i)}
                    className="border-b hairline first:border-t"
                  >
                    <Link
                      href={`/work/${b.slug}`}
                      className="focus-ring group block py-8 md:py-10"
                    >
                      {/* Mobile-only image card */}
                      <div className="lg:hidden relative aspect-[16/10] mb-6 bg-white/90 rounded-lg overflow-hidden">
                        <Image
                          src={b.hero}
                          alt={client}
                          fill
                          sizes="100vw"
                          className="object-contain p-6"
                        />
                      </div>

                      <div className="flex items-baseline justify-between gap-6">
                        <div className="min-w-0">
                          <span className="font-medium text-xs text-bone/40 tabular-nums block mb-2">
                            {i + 1}
                          </span>
                          <h2
                            className={`font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.25rem,5.5vw,5rem)] transition-all duration-500 ease-smooth group-hover:translate-x-2 ${
                              isActive ? 'text-bone' : 'text-bone/35'
                            }`}
                          >
                            {client}
                          </h2>
                          <p
                            className={`mt-3 text-sm md:text-base transition-colors duration-500 ${
                              isActive ? 'text-bone/75' : 'text-bone/35'
                            }`}
                          >
                            {tag}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border transition-all duration-500 ${
                            isActive
                              ? 'border-bone bg-bone text-ink'
                              : 'border-bone/20 text-bone/35'
                          }`}
                        >
                          <Arrow className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </li>
                </SectionReveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-wide px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <h2 className="md:col-span-7 font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-lg">
              {t('ctaBlock.headline')}
            </h2>
            <div className="md:col-span-5 md:justify-self-end">
              <CtaButton href="/connect">{t('ctaBlock.ctaPrimary')}</CtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
