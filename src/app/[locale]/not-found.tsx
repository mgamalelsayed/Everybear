import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Arrow } from '@/components/icons/Arrow';
import { CtaButton } from '@/components/CtaButton';

export default function NotFound() {
  const t = useTranslations('nav');

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Backplate 404 */}
      <p
        aria-hidden
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-condensed font-black leading-none tracking-[-0.04em] text-bone/[0.05]"
        style={{ fontSize: 'clamp(12rem, 40vw, 40rem)' }}
      >
        404
      </p>

      <div className="relative z-10 mx-auto max-w-wide px-6 md:px-10 py-32 w-full">
        <h1 className="font-condensed font-black uppercase leading-[0.9] tracking-[-0.03em] text-display-xl max-w-[14ch]">
          Lost in the workshop.
        </h1>
        <p className="mt-10 text-base md:text-lg text-bone/75 leading-relaxed max-w-xl">
          The page you were looking for is not here. It may have moved, or
          never existed. Take a look at our work, or get in touch.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <CtaButton href="/">Home</CtaButton>
          <Link
            href="/work"
            className="focus-ring inline-flex items-center gap-2 text-sm md:text-base text-bone/70 hover:text-bone transition-colors"
          >
            {t('work')}
            <Arrow className="w-4 h-4" />
          </Link>
          <Link
            href="/connect"
            className="focus-ring inline-flex items-center gap-2 text-sm md:text-base text-bone/70 hover:text-bone transition-colors"
          >
            {t('connect')}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
