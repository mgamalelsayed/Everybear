'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IntroScratch } from './IntroScratch';
import { CtaButton } from './CtaButton';

const ease = [0.6, 0.05, 0.05, 1] as const;

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden">
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
          className="font-condensed font-black leading-[0.86] tracking-[-0.025em] uppercase select-none -ms-[0.04em]"
          style={{ fontSize: 'clamp(4rem, 15vw, 14rem)' }}
        >
          <span className="block">Everybear</span>
          <span className="block">Everywhere</span>
        </motion.h1>

        {/*
          Auto-layout-style row:
          - LEFT col: vertical stack of eyebrow + CTAs with consistent gap
          - RIGHT col: lede paragraph
          - items-end aligns the bottom of both columns (lede sits at the CTA line)
        */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8 md:gap-x-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.7, ease }}
            className="md:col-span-6 lg:col-span-5 flex flex-col gap-10 md:gap-12"
          >
            <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55">
              {t('eyebrow')}
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <CtaButton href="/connect">{t('ctaPrimary')}</CtaButton>
              <a
                href="#work"
                className="focus-ring inline-flex items-center text-sm md:text-base text-bone/70 hover:text-bone transition-colors"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.85, ease }}
            className="md:col-span-6 lg:col-span-5 lg:col-start-8 text-base md:text-lg leading-relaxed rtl:leading-[1.85] text-bone/85 max-w-prose"
          >
            {t('lede')}
          </motion.p>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="absolute bottom-6 inset-x-0 z-10 flex justify-center"
      >
        <span className="font-medium text-[10px] rtl:text-sm uppercase tracking-[0.4em] rtl:tracking-normal text-bone/55">
          ↓ Scroll
        </span>
      </motion.div>
    </section>
  );
}
