import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SectionReveal } from './SectionReveal';
import { BOOK_A_CALL_URL } from '@/lib/links';

export function CtaBlock() {
  const t = useTranslations('ctaBlock');

  return (
    <section className="border-b hairline">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-32 md:py-52">
        <SectionReveal>
          <h2 className="font-medium text-display-xl max-w-[16ch] leading-[1.05] rtl:leading-[1.25]">
            {t('headline')}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="mt-24 md:mt-40 flex flex-wrap items-center gap-6 md:gap-10 text-sm">
            <Link
              href="/connect"
              className="focus-ring inline-flex items-center gap-3 bg-bone text-ink rounded-full px-6 py-3.5 hover:bg-white transition-colors"
            >
              {t('ctaPrimary')}
              <span aria-hidden className="inline-block rtl:rotate-180">→</span>
            </Link>
            <a
              href={BOOK_A_CALL_URL}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-3 text-bone/85 hover:text-bone transition-colors"
            >
              {t('ctaSecondary')}
              <span aria-hidden className="inline-block rtl:rotate-180">→</span>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
