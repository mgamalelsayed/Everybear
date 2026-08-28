'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CtaButton } from './CtaButton';
import { Arrow } from './icons/Arrow';
import { BOOK_A_CALL_URL } from '@/lib/links';

const ease = [0.6, 0.05, 0.05, 1] as const;

export function CtaBlock() {
  const t = useTranslations('ctaBlock');

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 1.1, delay: 0.1, ease }}
          className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.035em] max-w-[16ch]"
          style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}
        >
          {t('headline')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-10"
        >
          <CtaButton href="/connect">{t('ctaPrimary')}</CtaButton>
          <a
            href={BOOK_A_CALL_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 text-sm md:text-base text-bone/70 hover:text-bone transition-colors"
          >
            {t('ctaSecondary')}
            <span className="inline-block">
              <Arrow className="w-4 h-4" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
