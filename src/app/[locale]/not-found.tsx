import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Arrow } from '@/components/icons/Arrow';

export default function NotFound() {
  // Note: next-intl's not-found uses fallback locale messages when
  // hit outside a known locale, which is fine for a static 404.
  const t = useTranslations('nav');

  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-wide px-6 md:px-10 py-32 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <p className="font-medium text-[11px] rtl:text-sm uppercase tracking-[0.3em] rtl:tracking-normal text-bone/55 mb-8">
            404
          </p>
          <h1 className="font-condensed font-black uppercase leading-[0.92] tracking-[-0.02em] rtl:leading-[1.1] rtl:tracking-normal text-display-xl">
            Lost in the workshop.
          </h1>
          <p className="mt-10 text-base md:text-lg text-bone/85 leading-relaxed rtl:leading-[1.85] max-w-xl">
            The page you were looking for is not here. It may have moved, or
            never existed. Take a look at our work, or get in touch.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 md:gap-6">
            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-3 bg-bone text-ink rounded-full px-6 py-3 text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="focus-ring inline-flex items-center gap-3 text-bone/85 hover:text-bone transition-colors"
            >
              {t('work')}
              <span className="inline-block rtl:rotate-180"><Arrow className="w-4 h-4" /></span>
            </Link>
            <Link
              href="/connect"
              className="focus-ring inline-flex items-center gap-3 text-bone/85 hover:text-bone transition-colors"
            >
              {t('connect')}
              <span className="inline-block rtl:rotate-180"><Arrow className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
