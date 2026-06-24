import { useTranslations } from 'next-intl';
import { SectionReveal } from './SectionReveal';
import { CtaButton } from './CtaButton';
import { Arrow } from './icons/Arrow';
import { BOOK_A_CALL_URL } from '@/lib/links';

export function CtaBlock() {
  const t = useTranslations('ctaBlock');

  return (
    <section className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-20 md:py-32">
        <SectionReveal>
          <h2 className="font-medium text-display-xl max-w-[16ch] leading-[1.05] rtl:leading-[1.25]">
            {t('headline')}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="mt-24 md:mt-40 flex flex-wrap items-center gap-6 md:gap-10">
            <CtaButton href="/connect">{t('ctaPrimary')}</CtaButton>
            <a
              href={BOOK_A_CALL_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 text-sm md:text-base text-bone/70 hover:text-bone transition-colors"
            >
              {t('ctaSecondary')}
              <span className="inline-block rtl:rotate-180">
                <Arrow className="w-4 h-4" />
              </span>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
