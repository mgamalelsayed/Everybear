'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CtaButton } from './CtaButton';

const ease = [0.6, 0.05, 0.05, 1] as const;

/**
 * Type + CTA overlay only. The bear sits behind the whole site as a fixed
 * backdrop rendered by BearBackdrop at the layout root, so this section just
 * grades it down on the left to keep the slogan legible.
 */
export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Directional gradient — left side darkened so slogan reads clean,
          right side left open so the bear backdrop shows through. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-t from-ink via-transparent to-ink/40"
      />

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 min-h-screen flex flex-col justify-center pt-28 pb-10">
        <motion.h1
          lang="en"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
          className="font-condensed font-black leading-[0.86] tracking-[-0.025em] uppercase select-none -ms-[0.04em] mix-blend-difference"
          style={{ fontSize: 'clamp(2.75rem, 15vw, 14rem)', color: '#f0ece1' }}
        >
          <span className="block">Everybear</span>
          <span className="block">Everywhere</span>
        </motion.h1>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8 md:gap-x-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
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
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="md:col-span-6 lg:col-span-5 lg:col-start-8 text-base md:text-lg leading-relaxed rtl:leading-[1.85] text-bone/85 max-w-prose"
          >
            {t('lede')}
          </motion.p>
        </div>
      </div>

    </section>
  );
}
