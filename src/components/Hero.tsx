'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { IntroScratch } from './IntroScratch';

const ease = [0.6, 0.05, 0.05, 1] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden border-b hairline">
      {/* Bear photograph: settles in after the scratch animation as a quiet
          backdrop behind the slogan. Cropped to remove original portfolio text. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 2.2, delay: 1.6, ease }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/bear-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] select-none"
        />
        {/* Gradient masks for text legibility on top of the bear */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
      </motion.div>

      <IntroScratch />

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 min-h-screen flex flex-col justify-center pt-28 pb-20">
        {/* Slogan, always English, this is the brand mark */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease }}
          className="font-condensed font-black leading-[0.86] tracking-[-0.025em] uppercase select-none"
          style={{ fontSize: 'clamp(4rem, 15vw, 14rem)' }}
        >
          <span className="block">Everybear</span>
          <span className="block">Everywhere</span>
        </motion.h1>

        {/* Eyebrow + descriptor row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
        >
          <p className="md:col-span-5 font-medium text-[11px] uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55">
            {t('eyebrow')}
          </p>
          <p className="md:col-span-5 md:col-start-8 text-base md:text-lg leading-relaxed rtl:leading-[1.85] text-bone/85 max-w-prose">
            {t('lede')}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.95, ease }}
          className="mt-10 md:mt-14 flex flex-wrap items-center gap-4 md:gap-6"
        >
          <Link
            href="/connect"
            className="focus-ring group relative inline-flex items-center gap-4 bg-bone text-ink rounded-full ps-7 pe-3 py-3 text-base md:text-lg font-medium shadow-[0_10px_40px_-10px_rgba(240,236,225,0.5)] hover:shadow-[0_18px_60px_-10px_rgba(240,236,225,0.75)] hover:scale-[1.02] transition-all duration-300 ease-smooth"
          >
            {t('ctaPrimary')}
            <span
              aria-hidden
              className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-ink text-bone rtl:rotate-180 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-[18px] md:h-[18px]"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
          <a
            href="#work"
            className="focus-ring inline-flex items-center gap-2 text-sm md:text-base text-bone/70 hover:text-bone transition-colors ms-2 md:ms-4"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="absolute bottom-6 inset-x-0 z-10 flex justify-center"
      >
        <span className="font-medium text-[10px] uppercase tracking-[0.4em] rtl:tracking-normal text-bone/55">
          ↓ Scroll
        </span>
      </motion.div>
    </section>
  );
}
